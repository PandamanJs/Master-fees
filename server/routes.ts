import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertSchoolSchema,
  insertBankingInfoSchema,
  insertFeeStructureSchema,
  insertStudentSchema,
  insertReceiptTemplateSchema,
  insertReminderConfigSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Onboarding Step 1: School Information
  app.post("/api/schools", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const schoolData = insertSchoolSchema.parse({ ...req.body, userId });
      const school = await storage.createSchool(schoolData);
      res.json(school);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/schools/my", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      res.json(school);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Onboarding Step 2: Banking Information
  app.post("/api/banking", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const bankingData = insertBankingInfoSchema.parse({ ...req.body, schoolId: school.id });
      const banking = await storage.createBankingInfo(bankingData);
      res.json(banking);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/banking/my", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const banking = await storage.getBankingInfoBySchoolId(school.id);
      res.json(banking);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Onboarding Step 3: Fee Structures
  app.post("/api/fee-structures", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const feeData = insertFeeStructureSchema.parse({ ...req.body, schoolId: school.id });
      const fee = await storage.createFeeStructure(feeData);
      res.json(fee);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/fee-structures", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const fees = await storage.getFeeStructuresBySchoolId(school.id);
      res.json(fees);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Onboarding Step 4: Students
  app.post("/api/students", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const studentData = insertStudentSchema.parse({ ...req.body, schoolId: school.id });
      const student = await storage.createStudent(studentData);
      res.json(student);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/students", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const students = await storage.getStudentsBySchoolId(school.id);
      res.json(students);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Onboarding Step 5: Receipt Templates
  app.post("/api/receipt-templates", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const templateData = insertReceiptTemplateSchema.parse({ ...req.body, schoolId: school.id });
      const template = await storage.createReceiptTemplate(templateData);
      res.json(template);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/receipt-templates", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const templates = await storage.getReceiptTemplatesBySchoolId(school.id);
      res.json(templates);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Onboarding Step 6: Reminder Configurations
  app.post("/api/reminder-configs", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const configData = insertReminderConfigSchema.parse({ ...req.body, schoolId: school.id });
      const config = await storage.createReminderConfig(configData);
      res.json(config);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/reminder-configs", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const school = await storage.getSchoolByUserId(userId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      
      const configs = await storage.getReminderConfigsBySchoolId(school.id);
      res.json(configs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Complete onboarding
  app.post("/api/onboarding/complete", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.updateUserOnboarding(userId, true);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Parent Payment Lookup (public endpoint - no auth required)
  app.post("/api/parent/lookup", async (req, res) => {
    try {
      const { phoneNumber, studentId, schoolCode } = req.body;
      
      if (!phoneNumber && !studentId) {
        return res.status(400).json({ message: "Phone number or student ID is required" });
      }
      
      // For now, assume schoolCode maps to schoolId (this could be enhanced)
      const schoolId = parseInt(schoolCode) || 1;
      
      let students;
      if (phoneNumber) {
        students = await storage.getStudentByPhoneAndSchool(phoneNumber, schoolId);
      } else if (studentId) {
        const student = await storage.getStudentByIdAndSchool(studentId, schoolId);
        students = student ? [student] : [];
      }
      
      if (!students || students.length === 0) {
        return res.status(404).json({ message: "No students found" });
      }
      
      // Get fee information for each student
      const studentsWithFees = await Promise.all(
        students.map(async (student) => {
          const fees = await storage.getStudentFeesByStudentId(student.id);
          return { ...student, fees };
        })
      );
      
      res.json(studentsWithFees);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}