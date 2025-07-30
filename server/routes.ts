import type { Express } from "express";
import { createServer, type Server } from "http";
import { Router } from "express";
import { z } from "zod";
import { 
  loginSchema, 
  registerSchema,
  insertStudentSchema,
  insertFeeCategorySchema,
  insertStudentFeeSchema,
  insertPaymentSchema,
  type User 
} from "@shared/schema";
import { storage } from "./storage";

const router = Router();

// Authentication routes
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Demo login - accept demo123 for any user
    const isValidPassword = password === "demo123";
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ 
      user: userWithoutPassword,
      token: "demo-jwt-token",
      message: "Login successful"
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Dashboard data routes
router.get("/dashboard/parent/:parentId", async (req, res) => {
  try {
    const parentId = parseInt(req.params.parentId);
    
    const students = await storage.getStudentsByParent(parentId);
    const allPendingFees = [];
    const allPayments = [];
    
    for (const student of students) {
      const pendingFees = await storage.getPendingFeesByStudent(student.id);
      const payments = await storage.getPaymentsByStudent(student.id);
      
      allPendingFees.push(...pendingFees.map(fee => ({ ...fee, student })));
      allPayments.push(...payments);
    }

    const totalPending = allPendingFees.reduce((sum, fee) => sum + parseFloat(fee.amount), 0);
    const totalPaid = allPayments
      .filter(payment => payment.status === 'completed')
      .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

    res.json({
      students,
      pendingFees: allPendingFees,
      recentPayments: allPayments.slice(0, 5),
      summary: {
        totalPending,
        totalPaid,
        studentsCount: students.length
      }
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to load dashboard" });
  }
});

router.get("/dashboard/school/:schoolId", async (req, res) => {
  try {
    const schoolId = parseInt(req.params.schoolId);
    
    const students = await storage.getStudentsBySchool(schoolId);
    const feeCategories = await storage.getFeeCategoriesBySchool(schoolId);
    
    let totalRevenue = 0;
    let pendingAmount = 0;
    let totalPayments = 0;

    for (const student of students) {
      const fees = await storage.getStudentFeesByStudent(student.id);
      const payments = await storage.getPaymentsByStudent(student.id);
      
      pendingAmount += fees
        .filter(fee => fee.status === 'pending')
        .reduce((sum, fee) => sum + parseFloat(fee.amount), 0);
      
      const completedPayments = payments.filter(p => p.status === 'completed');
      totalRevenue += completedPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
      totalPayments += completedPayments.length;
    }

    res.json({
      students,
      feeCategories,
      statistics: {
        totalStudents: students.length,
        totalRevenue,
        pendingAmount,
        totalPayments,
        activeCategories: feeCategories.filter(cat => cat.isActive).length
      }
    });
  } catch (error) {
    console.error("School dashboard error:", error);
    res.status(500).json({ error: "Failed to load school dashboard" });
  }
});

// Student routes
router.get("/students/school/:schoolId", async (req, res) => {
  try {
    const schoolId = parseInt(req.params.schoolId);
    const students = await storage.getStudentsBySchool(schoolId);
    res.json({ students });
  } catch (error) {
    console.error("Error getting students:", error);
    res.status(500).json({ error: "Failed to get students" });
  }
});

// Fee routes
router.get("/fees/student/:studentId", async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const fees = await storage.getStudentFeesByStudent(studentId);
    res.json({ fees });
  } catch (error) {
    console.error("Error getting student fees:", error);
    res.status(500).json({ error: "Failed to get student fees" });
  }
});

// Payment routes
router.post("/payments", async (req, res) => {
  try {
    const paymentData = insertPaymentSchema.parse(req.body);
    
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const receiptNumber = `RCP-${Date.now()}`;
    
    const payment = await storage.createPayment({
      ...paymentData,
      transactionId,
      receiptNumber,
      status: 'completed',
      paymentDate: new Date()
    });

    await storage.updateStudentFee(payment.studentFeeId, { status: 'paid' });

    res.status(201).json({ 
      payment,
      message: "Payment processed successfully"
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

router.get("/payments/student/:studentId", async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const payments = await storage.getPaymentsByStudent(studentId);
    res.json({ payments });
  } catch (error) {
    console.error("Error getting payments:", error);
    res.status(500).json({ error: "Failed to get payments" });
  }
});

// Schools route
router.get("/schools", async (req, res) => {
  try {
    const schools = await storage.getAllSchools();
    res.json({ schools });
  } catch (error) {
    console.error("Error getting schools:", error);
    res.status(500).json({ error: "Failed to get schools" });
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Register all API routes with /api prefix
  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}
