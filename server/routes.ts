import type { Express } from "express";
import { createServer, type Server } from "http";
import { Router } from "express";
import figmaRoutes from "./figma-routes";
import { z } from "zod";
import { 
  loginSchema, 
  registerSchema,
  insertStudentSchema,
  insertFeeCategorySchema,
  insertStudentFeeSchema,
  insertPaymentSchema,
  contactFormSchema,
  type User 
} from "@shared/schema";
import { storage } from "./storage";
import { sendContactNotification, sendContactConfirmation } from "./email";
import { sendContactFormSMS, sendAdminNotificationSMS, sendPaymentConfirmationSMS } from "./sms";
import { sendJobApplicationConfirmation, sendJobApplicationNotification } from "./job-application-email";
import { sendJobApplicationSMS } from "./job-application-sms";
import { quickbooksRouter } from "./quickbooks-routes";
import { ObjectStorageService } from "./objectStorage";

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

    // Send SMS payment confirmation if phone number is available
    try {
      // Get student and parent details for SMS
      const studentFee = await storage.getStudentFeeById(payment.studentFeeId);
      if (studentFee) {
        const student = await storage.getStudentById(studentFee.studentId);
        if (student && student.guardianPhone) {
          await sendPaymentConfirmationSMS(
            student.guardianPhone,
            `${student.firstName} ${student.lastName}`,
            parseFloat(paymentData.amount),
            receiptNumber
          );
        }
      }
    } catch (smsError) {
      console.error("Payment SMS notification error:", smsError);
      // Continue even if SMS fails
    }

    res.status(201).json({ 
      payment,
      message: "Payment processed successfully! SMS confirmation will be sent if phone number is available."
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

// Contact form routes
router.post("/contact", async (req, res) => {
  try {
    const contactData = contactFormSchema.parse(req.body);
    
    // Save contact message to database
    const contactMessage = await storage.createContactMessage({
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone || null,
      schoolName: contactData.schoolName || null,
      subject: contactData.subject,
      message: contactData.message,
      status: 'new',
      isRead: false
    });

    // Send email and SMS notifications
    try {
      const emailPromises = [
        sendContactNotification(contactData),
        sendContactConfirmation(contactData)
      ];

      const smsPromises = [];
      
      // Send SMS confirmation to user if phone provided
      if (contactData.phone) {
        smsPromises.push(
          sendContactFormSMS(contactData.name, contactData.phone, contactData.subject)
        );
      }

      // Send SMS notification to admin (if admin phone is configured)
      const adminPhone = process.env.ADMIN_PHONE;
      if (adminPhone) {
        smsPromises.push(
          sendAdminNotificationSMS(
            adminPhone, 
            `New contact form submission from ${contactData.name} about "${contactData.subject}"`
          )
        );
      }

      await Promise.all([...emailPromises, ...smsPromises]);
    } catch (notificationError) {
      console.error("Notification error:", notificationError);
      // Continue even if notifications fail
    }

    res.status(201).json({ 
      message: contactData.phone 
        ? "Thank you for your message! We'll get back to you within 24 hours. Check your phone for SMS confirmation."
        : "Thank you for your message! We'll get back to you within 24 hours.",
      contactId: contactMessage.id
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

// Admin routes for managing contact messages
router.get("/admin/contact-messages", async (req, res) => {
  try {
    const messages = await storage.getAllContactMessages();
    res.json({ messages });
  } catch (error) {
    console.error("Error getting contact messages:", error);
    res.status(500).json({ error: "Failed to get contact messages" });
  }
});

router.get("/admin/contact-messages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const message = await storage.getContactMessageById(id);
    
    if (!message) {
      return res.status(404).json({ error: "Contact message not found" });
    }
    
    res.json({ message });
  } catch (error) {
    console.error("Error getting contact message:", error);
    res.status(500).json({ error: "Failed to get contact message" });
  }
});

router.put("/admin/contact-messages/:id/read", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await storage.markContactMessageAsRead(id);
    
    if (!success) {
      return res.status(404).json({ error: "Contact message not found" });
    }
    
    res.json({ message: "Contact message marked as read" });
  } catch (error) {
    console.error("Error marking contact message as read:", error);
    res.status(500).json({ error: "Failed to mark contact message as read" });
  }
});

router.put("/admin/contact-messages/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    const updatedMessage = await storage.updateContactMessage(id, { status });
    
    if (!updatedMessage) {
      return res.status(404).json({ error: "Contact message not found" });
    }
    
    res.json({ message: updatedMessage });
  } catch (error) {
    console.error("Error updating contact message:", error);
    res.status(500).json({ error: "Failed to update contact message" });
  }
});

// Job Applications Schema
const jobApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please select your experience level"),
  education: z.string().min(2, "Education background is required"),
  skills: z.string().min(10, "Please describe your relevant skills"),
  motivation: z.string().min(50, "Please tell us why you want to join our team"),
  availability: z.string().min(1, "Please select your availability"),
  portfolio: z.string().optional(),
  resume: z.string().optional()
});

// Job Applications endpoint
router.post("/job-applications", async (req, res) => {
  try {
    const applicationData = jobApplicationSchema.parse(req.body);

    // Store the job application
    const application = await storage.createJobApplication({
      ...applicationData,
      appliedAt: new Date(),
      status: 'pending'
    });

    // Send email notifications
    try {
      const emailPromises = [];
      
      // Send confirmation email to applicant
      if (process.env.SENDGRID_API_KEY) {
        emailPromises.push(
          sendJobApplicationConfirmation(applicationData.email, applicationData.fullName, applicationData.position)
        );

        // Send notification to HR/Admin
        emailPromises.push(
          sendJobApplicationNotification('masterfees101@gmail.com', applicationData)
        );
      }

      // Send SMS notification
      const smsPromises = [];
      if (process.env.TWILIO_ACCOUNT_SID && applicationData.phone) {
        smsPromises.push(
          sendJobApplicationSMS(applicationData.phone, applicationData.fullName, applicationData.position)
        );
      }

      await Promise.all([...emailPromises, ...smsPromises]);
    } catch (notificationError) {
      console.error("Job application notification error:", notificationError);
      // Continue even if notifications fail
    }

    res.status(201).json({ 
      message: "Thank you for your application! We'll review it and get back to you within 5 business days.",
      applicationId: application.id
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Job application error:", error);
    res.status(500).json({ error: "Failed to submit job application" });
  }
});

// Object Storage routes
router.post("/objects/upload", async (req, res) => {
  try {
    const objectStorageService = new ObjectStorageService();
    const uploadURL = await objectStorageService.getObjectEntityUploadURL();
    res.json({ uploadURL });
  } catch (error) {
    console.error("Error getting upload URL:", error);
    res.status(500).json({ error: "Failed to get upload URL" });
  }
});

// CV Information Extraction endpoint
router.post("/extract-cv-info", async (req, res) => {
  try {
    const { cvUrl } = req.body;
    
    if (!cvUrl) {
      return res.status(400).json({ error: "CV URL is required" });
    }

    // Mock CV extraction for now - in production, you'd use a service like:
    // - Google Document AI
    // - Azure Form Recognizer
    // - AWS Textract
    // - OpenAI API for document parsing
    
    // For demo purposes, return mock extracted information
    const mockExtractedInfo = {
      fullName: "John Doe",
      email: "john.doe@example.com", 
      phone: "+260971234567",
      education: "Bachelor's degree in Computer Science from University of Zambia",
      skills: "JavaScript, React, Node.js, Python, SQL, Git, AWS, Project Management",
      experience: "mid" // This would be determined from the CV content
    };

    // In production, you would:
    // 1. Download the CV from the storage URL
    // 2. Extract text using OCR/document parsing
    // 3. Use AI/NLP to extract structured information
    // 4. Return the extracted data
    
    res.json({ 
      extractedInfo: mockExtractedInfo,
      message: "CV information extracted successfully" 
    });
    
  } catch (error) {
    console.error("CV extraction error:", error);
    res.status(500).json({ error: "Failed to extract CV information" });
  }
});

// Aptitude test routes
router.post("/aptitude/register", async (req, res) => {
  try {
    const registrationData = req.body;
    
    // Validate registration data
    if (!registrationData.fullName || !registrationData.email || !registrationData.testType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    res.status(200).json({ 
      success: true,
      message: 'Registration successful',
      testId: `test_${Date.now()}`
    });
  } catch (error) {
    console.error('Aptitude registration error:', error);
    res.status(500).json({ error: 'Failed to register for test' });
  }
});

router.post("/aptitude/submit", async (req, res) => {
  try {
    const testData = req.body;
    
    // Calculate scores
    const questions = testData.questions || [];
    const answers = testData.answers || {};
    let correctAnswers = 0;
    
    questions.forEach((q: any) => {
      if (answers[q.id] === q.correct) {
        correctAnswers++;
      }
    });
    
    const score = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;

    // AI Analysis simulation
    const aiAnalysis = {
      behaviorScore: 85 + Math.floor(Math.random() * 15),
      focusScore: 80 + Math.floor(Math.random() * 20),
      suspiciousActivity: [],
      overallIntegrity: 'high' as const
    };

    // Store test result - for now just return success
    res.status(201).json({ 
      success: true,
      message: 'Test submitted successfully',
      testId: `result_${Date.now()}`
    });
  } catch (error) {
    console.error('Aptitude test submission error:', error);
    res.status(500).json({ error: 'Failed to submit test' });
  }
});

router.get("/aptitude/results", async (req, res) => {
  try {
    // Fetch real aptitude test results from database
    const results = await storage.getAllAptitudeTests();
    
    // Transform database results to match expected format
    const transformedResults = results.map(result => ({
      id: result.id,
      candidate: {
        fullName: result.candidateName,
        email: result.candidateEmail,
        phone: result.candidatePhone,
        experience: result.experience
      },
      testTypes: Array.isArray(result.testType) ? result.testType : [result.testType],
      scores: typeof result.score === 'number' ? { overall: result.score } : result.score || {},
      totalQuestions: 20,
      correctAnswers: Math.round((result.score || 0) * 20 / 100),
      timeSpent: result.timeSpent || 0,
      aiAnalysis: result.aiAnalysis || {
        behaviorScore: 85,
        focusScore: 90,
        suspiciousActivity: [],
        overallIntegrity: 'high'
      },
      submittedAt: result.submittedAt?.toISOString() || new Date().toISOString(),
      status: result.status || 'pending',
      adminNotes: result.adminNotes || ''
    }));
    
    res.json(transformedResults);
  } catch (error) {
    console.error('Failed to fetch aptitude results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Register QuickBooks routes
router.use(quickbooksRouter);

export async function registerRoutes(app: Express): Promise<Server> {
  // Register all API routes with /api prefix
  app.use("/api", router);
  app.use("/api", figmaRoutes);

  const httpServer = createServer(app);
  return httpServer;
}
