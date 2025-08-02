import { pgTable, text, serial, integer, decimal, timestamp, boolean, uuid, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication and role management
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").$type<'admin' | 'parent' | 'school_admin'>().notNull(),
  schoolId: integer("school_id"),
  phoneNumber: text("phone_number"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schools table - Enhanced for comprehensive school information storage
export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  pincode: text("pincode"),
  district: text("district"),
  province: text("province"),
  
  // Contact Information
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  website: text("website"),
  
  // Administrative Details
  principalName: text("principal_name"),
  vicesPrincipalName: text("vices_principal_name"),
  registrationNumber: text("registration_number"),
  establishedYear: integer("established_year"),
  
  // School Type & Classification
  schoolType: text("school_type"), // 'primary', 'secondary', 'university', 'college', 'vocational'
  schoolCategory: text("school_category"), // 'public', 'private', 'government', 'missionary', 'community'
  curriculumType: text("curriculum_type"), // 'zambian', 'cambridge', 'ib', 'american', 'other'
  
  // Capacity & Structure
  totalStudents: integer("total_students"),
  totalTeachers: integer("total_teachers"),
  totalClasses: integer("total_classes"),
  gradesOffered: text("grades_offered").array(), // ['grade1', 'grade2', etc.]
  
  // Facilities & Services
  hasLibrary: boolean("has_library").default(false),
  hasLaboratory: boolean("has_laboratory").default(false),
  hasComputerLab: boolean("has_computer_lab").default(false),
  hasSportsField: boolean("has_sports_field").default(false),
  hasTransport: boolean("has_transport").default(false),
  hasHostel: boolean("has_hostel").default(false),
  hasCafeteria: boolean("has_cafeteria").default(false),
  
  // Financial Information
  averageFeeStructure: jsonb("average_fee_structure"), // {tuition: 1000, transport: 200, etc.}
  paymentMethods: text("payment_methods").array(), // ['cash', 'bank_transfer', 'mobile_money', etc.]
  
  // Academic Information
  academicYearStart: text("academic_year_start"), // 'january', 'february', etc.
  academicYearEnd: text("academic_year_end"),
  examBoards: text("exam_boards").array(), // ['ece', 'grade7', 'grade9', 'grade12']
  
  // Location Coordinates (for mapping)
  latitude: text("latitude"),
  longitude: text("longitude"),
  
  // System Fields
  dataSource: text("data_source").default("user_input"), // 'government_db', 'user_input', 'api_import'
  verificationStatus: text("verification_status").default("unverified"), // 'verified', 'unverified', 'pending'
  lastUpdated: timestamp("last_updated").defaultNow(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Students table
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").notNull(),
  studentId: text("student_id").notNull(), // School-specific student ID
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  class: text("class").notNull(),
  section: text("section"),
  rollNumber: text("roll_number"),
  dateOfBirth: timestamp("date_of_birth"),
  parentId: integer("parent_id"), // Links to users table
  guardianName: text("guardian_name"),
  guardianPhone: text("guardian_phone"),
  guardianEmail: text("guardian_email"),
  address: text("address"),
  isActive: boolean("is_active").default(true),
  admissionDate: timestamp("admission_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Onboarding Sessions - Track progress for each school onboarding
export const onboardingSessions = pgTable("onboarding_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").unique().notNull(), // UUID for unique session
  schoolName: text("school_name"),
  country: text("country"),
  stateProvince: text("state_province"),
  townDistrict: text("town_district"),
  
  // Step 3 data
  schoolEmail: text("school_email"),
  contactNumbers: text("contact_numbers").array(),
  physicalAddress: text("physical_address"),
  schoolCategories: text("school_categories").array(),
  schoolLogo: text("school_logo"), // URL to uploaded logo
  
  // Step 4 data
  selectedFeeCategories: text("selected_fee_categories").array(),
  customCategory: text("custom_category"),
  
  // Step 5 data
  gradePricing: jsonb("grade_pricing"),
  additionalFees: jsonb("additional_fees"),
  pricingCategories: jsonb("pricing_categories"),
  
  // Step 6 data
  productGroups: jsonb("product_groups"),
  
  // Step 7 data
  receiptTemplate: jsonb("receipt_template"),
  
  // Step 8 data
  bankAccounts: jsonb("bank_accounts"),
  
  // Step 9 data
  verificationData: jsonb("verification_data"),
  
  // Step 10 data
  credentials: jsonb("credentials"), // Store hashed password and email
  
  // Session tracking
  currentStep: integer("current_step").default(1),
  completedSteps: text("completed_steps").array().default([]),
  isCompleted: boolean("is_completed").default(false),
  finalSchoolId: integer("final_school_id"), // Links to schools table once completed
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Fee categories (tuition, transport, meals, etc.)
export const feeCategories = pgTable("fee_categories", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  frequency: text("frequency").$type<'monthly' | 'quarterly' | 'annually' | 'one_time'>().notNull(),
  dueDay: integer("due_day"), // Day of month for monthly fees
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Fee assignments to students
export const studentFees = pgTable("student_fees", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  feeCategoryId: integer("fee_category_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: text("status").$type<'pending' | 'paid' | 'overdue' | 'waived'>().default('pending'),
  academicYear: text("academic_year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Payment transactions
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").unique().notNull(),
  studentFeeId: integer("student_fee_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").$type<'upi' | 'card' | 'net_banking' | 'cash' | 'cheque'>().notNull(),
  paymentGateway: text("payment_gateway"),
  gatewayTransactionId: text("gateway_transaction_id"),
  status: text("status").$type<'pending' | 'completed' | 'failed' | 'refunded'>().default('pending'),
  paymentDate: timestamp("payment_date").notNull(),
  receiptNumber: text("receipt_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Notifications system
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").$type<'fee_due' | 'payment_success' | 'payment_failed' | 'announcement' | 'reminder'>().notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Academic years
export const academicYears = pgTable("academic_years", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").notNull(),
  name: text("name").notNull(), // e.g., "2024-25"
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  schoolName: text("school_name"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").$type<'new' | 'read' | 'replied' | 'resolved'>().default('new'),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSchoolSchema = createInsertSchema(schools).omit({
  id: true,
  createdAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
});

export const insertFeeCategorySchema = createInsertSchema(feeCategories).omit({
  id: true,
  createdAt: true,
});

export const insertStudentFeeSchema = createInsertSchema(studentFees).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertAcademicYearSchema = createInsertSchema(academicYears).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

// Job Applications table
export const jobApplications = pgTable('job_applications', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  position: text('position').notNull(),
  experience: text('experience').notNull(),
  education: text('education').notNull(),
  skills: text('skills').notNull(),
  motivation: text('motivation').notNull(),
  availability: text('availability').notNull(),
  portfolio: text('portfolio'),
  resume: text('resume'),
  status: text('status').default('pending'),
  appliedAt: timestamp('applied_at').defaultNow(),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  appliedAt: true,
});

export const insertOnboardingSessionSchema = createInsertSchema(onboardingSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Aptitude Tests table
export const aptitudeTests = pgTable("aptitude_tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateName: text("candidate_name").notNull(),
  candidateEmail: text("candidate_email").notNull(),
  candidatePhone: text("candidate_phone").notNull(),
  testType: text("test_type").notNull(), // 'frontend' | 'backend'
  experience: text("experience").notNull(),
  answers: jsonb("answers").notNull(),
  codingAnswer: text("coding_answer"),
  score: integer("score"),
  timeSpent: integer("time_spent"),
  aiAnalysis: jsonb("ai_analysis"),
  status: text("status").default("pending"), // 'pending' | 'reviewed' | 'approved' | 'rejected'
  adminNotes: text("admin_notes"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertAptitudeTestSchema = createInsertSchema(aptitudeTests).omit({
  id: true,
  submittedAt: true,
  score: true,
  aiAnalysis: true,
  status: true,
  adminNotes: true,
});

// Assessment Results table
export const assessmentResults = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  experience: text("experience").notNull(),
  testTypes: text("test_types").array().notNull(),
  answers: jsonb("answers").notNull(),
  performanceMetrics: jsonb("performance_metrics").notNull(),
  accuracy: integer("accuracy").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  timeSpent: integer("time_spent").notNull(), // in seconds
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAssessmentResultSchema = createInsertSchema(assessmentResults).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof insertUserSchema>;
export type School = typeof schools.$inferSelect;
export type NewSchool = z.infer<typeof insertSchoolSchema>;
export type Student = typeof students.$inferSelect;
export type NewStudent = z.infer<typeof insertStudentSchema>;
export type FeeCategory = typeof feeCategories.$inferSelect;
export type NewFeeCategory = z.infer<typeof insertFeeCategorySchema>;
export type StudentFee = typeof studentFees.$inferSelect;
export type NewStudentFee = z.infer<typeof insertStudentFeeSchema>;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = z.infer<typeof insertPaymentSchema>;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = z.infer<typeof insertNotificationSchema>;
export type AcademicYear = typeof academicYears.$inferSelect;
export type NewAcademicYear = z.infer<typeof insertAcademicYearSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = z.infer<typeof insertContactMessageSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type AptitudeTest = typeof aptitudeTests.$inferSelect;
export type NewAptitudeTest = z.infer<typeof insertAptitudeTestSchema>;
export type AssessmentResult = typeof assessmentResults.$inferSelect;
export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  schoolName: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// School Onboarding table - Complete onboarding data storage
export const schoolOnboarding = pgTable("school_onboarding", {
  id: serial("id").primaryKey(),
  
  // Step 1: School Selection
  schoolName: text("school_name").notNull(),
  selectedFromDatabase: boolean("selected_from_database").default(false),
  
  // Step 2: Location Information
  country: text("country").notNull(),
  stateProvince: text("state_province").notNull(),
  townDistrict: text("town_district").notNull(),
  
  // Step 3: Detailed School Information
  schoolEmail: text("school_email").notNull(),
  contactNumbers: text("contact_numbers").array(),
  physicalAddress: text("physical_address"),
  schoolCategories: text("school_categories").array(),
  schoolLogo: text("school_logo"),
  
  // Step 4: Fee Categories
  selectedFeeCategories: text("selected_fee_categories").array(),
  customFeeCategory: text("custom_fee_category"),
  
  // Step 5: Pricing Structure
  gradePricing: jsonb("grade_pricing"), // Complete pricing structure
  additionalFees: jsonb("additional_fees"),
  pricingCategories: text("pricing_categories").array(),
  
  // Step 6: Product Groups
  productGroups: jsonb("product_groups"), // Group assignments
  
  // Step 7: Receipt Template
  receiptTemplate: text("receipt_template"),
  
  // Step 8: Bank Account Information
  bankAccounts: jsonb("bank_accounts"), // Array of bank account objects
  
  // Step 9: Account Verification
  verificationData: jsonb("verification_data"), // Complete verification info
  
  // Step 10: Account Credentials
  dashboardEmail: text("dashboard_email").notNull(),
  dashboardPassword: text("dashboard_password").notNull(), // Should be hashed in production
  
  // AI Enhancement Fields
  aiAutoFilled: boolean("ai_auto_filled").default(false),
  aiConfidenceScore: integer("ai_confidence_score"), // 0-100
  aiSuggestedData: jsonb("ai_suggested_data"), // Store AI suggestions for review
  
  // Status and Tracking
  onboardingStatus: text("onboarding_status").default("in_progress"), // 'in_progress', 'completed', 'pending_verification'
  currentStep: integer("current_step").default(1),
  completedSteps: integer("completed_steps").array(),
  
  // Unique identifier for dashboard access
  schoolUniqueId: text("school_unique_id").unique().notNull(),
  
  // System Fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  
  // Dashboard access tracking
  lastLoginAt: timestamp("last_login_at"),
  isActive: boolean("is_active").default(true),
});

export const insertSchoolOnboardingSchema = createInsertSchema(schoolOnboarding).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
  lastLoginAt: true,
});

export type SchoolOnboarding = typeof schoolOnboarding.$inferSelect;
export type NewSchoolOnboarding = z.infer<typeof insertSchoolOnboardingSchema>;