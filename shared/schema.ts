import {
  pgTable,
  text,
  integer,
  serial,
  timestamp,
  boolean,
  decimal,
  varchar,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table for authenticated school admins
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  onboardingCompleted: boolean("onboarding_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schools table for school information (Step 1)
export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Banking information for schools (Step 2)
export const bankingInfo = pgTable("banking_info", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").references(() => schools.id).notNull(),
  bankName: text("bank_name"),
  accountNumber: text("account_number"),
  accountName: text("account_name"),
  routingNumber: text("routing_number"),
  mobileMoneyNumber: text("mobile_money_number"),
  mobileMoneyProvider: text("mobile_money_provider"),
  flutterwaveSecretKey: text("flutterwave_secret_key"),
  flutterwavePublicKey: text("flutterwave_public_key"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Fee structures and products (Step 3)
export const feeStructures = pgTable("fee_structures", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").references(() => schools.id).notNull(),
  name: text("name").notNull(), // e.g., "Grade 1 Tuition", "Library Fee"
  category: text("category").notNull(), // "tuition", "library", "sports", "transport"
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("NGN"),
  grade: text("grade"), // applicable grade/class
  term: text("term"), // "Term 1", "Term 2", "Term 3"
  academic_year: text("academic_year"),
  allowPartPayment: boolean("allow_part_payment").default(true),
  minimumPayment: decimal("minimum_payment", { precision: 10, scale: 2 }),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Students table (Step 4)
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").references(() => schools.id).notNull(),
  studentId: text("student_id").notNull(), // school's internal ID
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  grade: text("grade").notNull(),
  class: text("class"),
  parentFirstName: text("parent_first_name"),
  parentLastName: text("parent_last_name"),
  parentEmail: text("parent_email"),
  parentPhone: text("parent_phone").notNull(),
  parentAltPhone: text("parent_alt_phone"),
  address: text("address"),
  dateOfBirth: timestamp("date_of_birth"),
  gender: text("gender"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Student fee assignments
export const studentFees = pgTable("student_fees", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  feeStructureId: integer("fee_structure_id").references(() => feeStructures.id).notNull(),
  amountDue: decimal("amount_due", { precision: 10, scale: 2 }).notNull(),
  amountPaid: decimal("amount_paid", { precision: 10, scale: 2 }).default("0"),
  balance: decimal("balance", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"), // "pending", "partial", "paid", "overdue"
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payment transactions
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  studentFeeId: integer("student_fee_id").references(() => studentFees.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("NGN"),
  paymentMethod: text("payment_method"), // "card", "mobile_money", "bank_transfer"
  paymentProvider: text("payment_provider"), // "flutterwave", "paystack"
  transactionReference: text("transaction_reference").unique(),
  status: text("status").default("pending"), // "pending", "successful", "failed"
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Receipt templates (Step 5)
export const receiptTemplates = pgTable("receipt_templates", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").references(() => schools.id).notNull(),
  name: text("name").notNull(),
  templateType: text("template_type").notNull(), // "receipt", "invoice"
  headerContent: text("header_content"),
  footerContent: text("footer_content"),
  logoPosition: text("logo_position").default("top-left"),
  colorScheme: text("color_scheme").default("blue"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Reminder configurations (Step 6)
export const reminderConfigs = pgTable("reminder_configs", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").references(() => schools.id).notNull(),
  name: text("name").notNull(),
  reminderType: text("reminder_type").notNull(), // "sms", "email", "whatsapp"
  daysBefore: integer("days_before").notNull(),
  message: text("message").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const userRelations = relations(users, ({ one }) => ({
  school: one(schools, {
    fields: [users.id],
    references: [schools.userId],
  }),
}));

export const schoolRelations = relations(schools, ({ one, many }) => ({
  user: one(users, {
    fields: [schools.userId],
    references: [users.id],
  }),
  bankingInfo: one(bankingInfo),
  students: many(students),
  feeStructures: many(feeStructures),
  receiptTemplates: many(receiptTemplates),
  reminderConfigs: many(reminderConfigs),
}));

export const studentRelations = relations(students, ({ one, many }) => ({
  school: one(schools, {
    fields: [students.schoolId],
    references: [schools.id],
  }),
  studentFees: many(studentFees),
}));

export const studentFeeRelations = relations(studentFees, ({ one, many }) => ({
  student: one(students, {
    fields: [studentFees.studentId],
    references: [students.id],
  }),
  feeStructure: one(feeStructures, {
    fields: [studentFees.feeStructureId],
    references: [feeStructures.id],
  }),
  transactions: many(transactions),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertSchoolSchema = createInsertSchema(schools).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBankingInfoSchema = createInsertSchema(bankingInfo).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFeeStructureSchema = createInsertSchema(feeStructures).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentFeeSchema = createInsertSchema(studentFees).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertReceiptTemplateSchema = createInsertSchema(receiptTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReminderConfigSchema = createInsertSchema(reminderConfigs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertSchool = z.infer<typeof insertSchoolSchema>;
export type School = typeof schools.$inferSelect;
export type InsertBankingInfo = z.infer<typeof insertBankingInfoSchema>;
export type BankingInfo = typeof bankingInfo.$inferSelect;
export type InsertFeeStructure = z.infer<typeof insertFeeStructureSchema>;
export type FeeStructure = typeof feeStructures.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof students.$inferSelect;
export type InsertStudentFee = z.infer<typeof insertStudentFeeSchema>;
export type StudentFee = typeof studentFees.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertReceiptTemplate = z.infer<typeof insertReceiptTemplateSchema>;
export type ReceiptTemplate = typeof receiptTemplates.$inferSelect;
export type InsertReminderConfig = z.infer<typeof insertReminderConfigSchema>;
export type ReminderConfig = typeof reminderConfigs.$inferSelect;