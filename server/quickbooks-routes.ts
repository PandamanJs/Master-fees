import { Router } from "express";
import { z } from "zod";
import QuickBooksService, { type QuickBooksTokens } from "./quickbooks";
import { storage } from "./storage";

const router = Router();
const qbService = new QuickBooksService();

// Store tokens in memory (in production, use a database)
let storedTokens: Map<string, QuickBooksTokens> = new Map();

// QuickBooks OAuth routes
router.get("/quickbooks/auth", async (req, res) => {
  try {
    const schoolId = req.query.schoolId as string;
    if (!schoolId) {
      return res.status(400).json({ error: "School ID is required" });
    }

    const authUrl = qbService.getAuthorizationUrl(schoolId);
    res.json({ authUrl });
  } catch (error) {
    console.error("QuickBooks auth error:", error);
    res.status(500).json({ error: "Failed to generate authorization URL" });
  }
});

router.post("/quickbooks/callback", async (req, res) => {
  try {
    const { code, realmId, state } = req.body;
    
    if (!code || !realmId || !state) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const tokens = await qbService.exchangeCodeForTokens(code, realmId, state);
    
    // Store tokens with school ID as key
    storedTokens.set(state, tokens);
    
    res.json({ 
      message: "QuickBooks connected successfully",
      companyId: realmId,
      schoolId: state
    });
  } catch (error) {
    console.error("QuickBooks callback error:", error);
    res.status(500).json({ error: "Failed to connect to QuickBooks" });
  }
});

// QuickBooks data sync routes
router.get("/quickbooks/sync/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected for this school" });
    }

    qbService.setTokens(tokens);
    
    const syncData = await qbService.syncSchoolData(parseInt(schoolId));
    
    res.json({
      message: "Data synced successfully",
      data: syncData,
      syncTimestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("QuickBooks sync error:", error);
    res.status(500).json({ error: "Failed to sync QuickBooks data" });
  }
});

// Dashboard data endpoint
router.get("/dashboard/data", async (req, res) => {
  try {
    // Get real data from storage
    const users = await storage.getUsers();
    const payments = await storage.getPayments();
    const contacts = await storage.getContacts();
    const smsSettings = await storage.getSMSSettings();
    
    // Calculate real statistics
    const totalStudents = users.length;
    const totalFees = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const completedPayments = payments.filter(p => p.status === 'completed');
    const pendingPayments = payments.filter(p => p.status === 'pending');
    
    const dashboardData = {
      stats: {
        totalStudents,
        totalFees,
        completedPaymentsAmount: completedPayments.reduce((sum, p) => sum + p.amount, 0),
        pendingPaymentsAmount: pendingPayments.reduce((sum, p) => sum + p.amount, 0),
        completedPaymentsCount: completedPayments.length,
        pendingPaymentsCount: pendingPayments.length,
        totalContacts: contacts.length,
        smsNotifications: contacts.length * 2, // Estimate based on contact submissions
        qbSyncStatus: storedTokens.size > 0 ? 'Connected' : 'Disconnected'
      },
      recentPayments: payments.slice(-10).reverse(), // Last 10 payments, newest first
      recentContacts: contacts.slice(-5).reverse(), // Last 5 contacts
      smsActivity: [
        { type: 'Payment Confirmation', count: completedPayments.length, status: 'sent' },
        { type: 'Contact Form', count: contacts.length, status: 'sent' },
        { type: 'Fee Reminder', count: pendingPayments.length, status: 'sent' },
        { type: 'Welcome Message', count: users.length, status: 'sent' }
      ],
      lastUpdated: new Date().toISOString()
    };
    
    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard data error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

// Live QuickBooks data endpoint
router.get("/quickbooks/live-data/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.json({
        connected: false,
        message: "QuickBooks not connected for this school",
        data: null
      });
    }

    qbService.setTokens(tokens);
    
    // Fetch live data from QuickBooks
    const customers = await qbService.getCustomers();
    const items = await qbService.getItems();
    const invoices = await qbService.getInvoices();
    const payments = await qbService.getPayments();
    
    const liveData = {
      connected: true,
      companyInfo: {
        totalCustomers: customers.length,
        totalItems: items.length,
        totalInvoices: invoices.length,
        totalPayments: payments.length
      },
      recentCustomers: customers.slice(-5),
      recentInvoices: invoices.slice(-5),
      recentPayments: payments.slice(-5),
      lastSyncTime: new Date().toISOString()
    };
    
    res.json(liveData);
  } catch (error) {
    console.error("QuickBooks live data error:", error);
    res.json({
      connected: false,
      message: "Error fetching QuickBooks data",
      error: error.message
    });
  }
});

// Get QuickBooks customers
router.get("/quickbooks/customers/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected" });
    }

    qbService.setTokens(tokens);
    const customers = await qbService.getCustomers();
    
    res.json({ customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// Create QuickBooks customer from school parent data
router.post("/quickbooks/customers/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected" });
    }

    const customerSchema = z.object({
      name: z.string(),
      companyName: z.string().optional(),
      givenName: z.string().optional(),
      familyName: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: z.object({
        line1: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        postalCode: z.string().optional(),
      }).optional()
    });

    const customerData = customerSchema.parse(req.body);
    
    qbService.setTokens(tokens);
    const customer = await qbService.createCustomer(customerData);
    
    res.status(201).json({ customer });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

// Get QuickBooks items (fee categories)
router.get("/quickbooks/items/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected" });
    }

    qbService.setTokens(tokens);
    const items = await qbService.getItems();
    
    res.json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Create QuickBooks item from fee category
router.post("/quickbooks/items/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected" });
    }

    const itemSchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      unitPrice: z.number().optional(),
      incomeAccountRef: z.string().optional()
    });

    const itemData = itemSchema.parse(req.body);
    
    qbService.setTokens(tokens);
    const item = await qbService.createItem(itemData);
    
    res.status(201).json({ item });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Failed to create item" });
  }
});

// Get QuickBooks invoices
router.get("/quickbooks/invoices/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected" });
    }

    qbService.setTokens(tokens);
    const invoices = await qbService.getInvoices();
    
    res.json({ invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

// Create QuickBooks invoice from student fees
router.post("/quickbooks/invoices/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected" });
    }

    const invoiceSchema = z.object({
      customerId: z.string(),
      customerName: z.string(),
      lines: z.array(z.object({
        itemId: z.string(),
        itemName: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
        description: z.string().optional()
      })),
      dueDate: z.string().optional(),
      docNumber: z.string().optional()
    });

    const invoiceData = invoiceSchema.parse(req.body);
    
    qbService.setTokens(tokens);
    const invoice = await qbService.createInvoice(invoiceData);
    
    res.status(201).json({ invoice });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Failed to create invoice" });
  }
});

// Get QuickBooks payments
router.get("/quickbooks/payments/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected" });
    }

    qbService.setTokens(tokens);
    const payments = await qbService.getPayments();
    
    res.json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// Create QuickBooks payment record
router.post("/quickbooks/payments/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.status(401).json({ error: "QuickBooks not connected" });
    }

    const paymentSchema = z.object({
      customerId: z.string(),
      customerName: z.string(),
      totalAmount: z.number(),
      invoiceId: z.string().optional(),
      txnDate: z.string().optional()
    });

    const paymentData = paymentSchema.parse(req.body);
    
    qbService.setTokens(tokens);
    const payment = await qbService.createPayment(paymentData);
    
    res.status(201).json({ payment });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// QuickBooks connection status
router.get("/quickbooks/status/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const tokens = storedTokens.get(schoolId);
    
    if (!tokens) {
      return res.json({ 
        connected: false,
        message: "QuickBooks not connected for this school"
      });
    }

    qbService.setTokens(tokens);
    const isConnected = qbService.isAuthenticated();
    
    res.json({
      connected: isConnected,
      companyId: tokens.realmId,
      connectedAt: tokens ? "Connected" : "Not connected",
      message: isConnected 
        ? "QuickBooks is connected and ready to sync data"
        : "QuickBooks connection needs to be refreshed"
    });
  } catch (error) {
    console.error("Error checking QuickBooks status:", error);
    res.status(500).json({ error: "Failed to check connection status" });
  }
});

// Disconnect QuickBooks
router.delete("/quickbooks/disconnect/:schoolId", async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    storedTokens.delete(schoolId);
    
    res.json({ 
      message: "QuickBooks disconnected successfully"
    });
  } catch (error) {
    console.error("Error disconnecting QuickBooks:", error);
    res.status(500).json({ error: "Failed to disconnect QuickBooks" });
  }
});

export { router as quickbooksRouter };