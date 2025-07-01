import { 
  users, 
  schools,
  bankingInfo,
  feeStructures,
  students,
  studentFees,
  transactions,
  receiptTemplates,
  reminderConfigs,
  type User, 
  type UpsertUser,
  type School,
  type InsertSchool,
  type BankingInfo,
  type InsertBankingInfo,
  type FeeStructure,
  type InsertFeeStructure,
  type Student,
  type InsertStudent,
  type StudentFee,
  type InsertStudentFee,
  type Transaction,
  type InsertTransaction,
  type ReceiptTemplate,
  type InsertReceiptTemplate,
  type ReminderConfig,
  type InsertReminderConfig,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserOnboarding(userId: string, completed: boolean): Promise<User>;

  // School operations
  createSchool(school: InsertSchool): Promise<School>;
  getSchoolByUserId(userId: string): Promise<School | undefined>;
  updateSchool(schoolId: number, school: Partial<InsertSchool>): Promise<School>;

  // Banking operations
  createBankingInfo(bankingInfo: InsertBankingInfo): Promise<BankingInfo>;
  getBankingInfoBySchoolId(schoolId: number): Promise<BankingInfo | undefined>;
  updateBankingInfo(schoolId: number, bankingInfo: Partial<InsertBankingInfo>): Promise<BankingInfo>;

  // Fee structure operations
  createFeeStructure(feeStructure: InsertFeeStructure): Promise<FeeStructure>;
  getFeeStructuresBySchoolId(schoolId: number): Promise<FeeStructure[]>;
  updateFeeStructure(feeId: number, feeStructure: Partial<InsertFeeStructure>): Promise<FeeStructure>;

  // Student operations
  createStudent(student: InsertStudent): Promise<Student>;
  getStudentsBySchoolId(schoolId: number): Promise<Student[]>;
  getStudentByIdAndSchool(studentId: string, schoolId: number): Promise<Student | undefined>;
  getStudentByPhoneAndSchool(parentPhone: string, schoolId: number): Promise<Student[]>;
  updateStudent(studentId: number, student: Partial<InsertStudent>): Promise<Student>;

  // Student fee operations
  createStudentFee(studentFee: InsertStudentFee): Promise<StudentFee>;
  getStudentFeesByStudentId(studentId: number): Promise<StudentFee[]>;
  updateStudentFee(studentFeeId: number, studentFee: Partial<InsertStudentFee>): Promise<StudentFee>;

  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByStudentFeeId(studentFeeId: number): Promise<Transaction[]>;

  // Receipt template operations
  createReceiptTemplate(template: InsertReceiptTemplate): Promise<ReceiptTemplate>;
  getReceiptTemplatesBySchoolId(schoolId: number): Promise<ReceiptTemplate[]>;

  // Reminder config operations
  createReminderConfig(config: InsertReminderConfig): Promise<ReminderConfig>;
  getReminderConfigsBySchoolId(schoolId: number): Promise<ReminderConfig[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserOnboarding(userId: string, completed: boolean): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ onboardingCompleted: completed, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // School operations
  async createSchool(school: InsertSchool): Promise<School> {
    const [newSchool] = await db.insert(schools).values(school).returning();
    return newSchool;
  }

  async getSchoolByUserId(userId: string): Promise<School | undefined> {
    const [school] = await db.select().from(schools).where(eq(schools.userId, userId));
    return school;
  }

  async updateSchool(schoolId: number, schoolData: Partial<InsertSchool>): Promise<School> {
    const [school] = await db
      .update(schools)
      .set({ ...schoolData, updatedAt: new Date() })
      .where(eq(schools.id, schoolId))
      .returning();
    return school;
  }

  // Banking operations
  async createBankingInfo(bankingData: InsertBankingInfo): Promise<BankingInfo> {
    const [banking] = await db.insert(bankingInfo).values(bankingData).returning();
    return banking;
  }

  async getBankingInfoBySchoolId(schoolId: number): Promise<BankingInfo | undefined> {
    const [banking] = await db.select().from(bankingInfo).where(eq(bankingInfo.schoolId, schoolId));
    return banking;
  }

  async updateBankingInfo(schoolId: number, bankingData: Partial<InsertBankingInfo>): Promise<BankingInfo> {
    const [banking] = await db
      .update(bankingInfo)
      .set({ ...bankingData, updatedAt: new Date() })
      .where(eq(bankingInfo.schoolId, schoolId))
      .returning();
    return banking;
  }

  // Fee structure operations
  async createFeeStructure(feeData: InsertFeeStructure): Promise<FeeStructure> {
    const [fee] = await db.insert(feeStructures).values(feeData).returning();
    return fee;
  }

  async getFeeStructuresBySchoolId(schoolId: number): Promise<FeeStructure[]> {
    return await db.select().from(feeStructures).where(eq(feeStructures.schoolId, schoolId));
  }

  async updateFeeStructure(feeId: number, feeData: Partial<InsertFeeStructure>): Promise<FeeStructure> {
    const [fee] = await db
      .update(feeStructures)
      .set({ ...feeData, updatedAt: new Date() })
      .where(eq(feeStructures.id, feeId))
      .returning();
    return fee;
  }

  // Student operations
  async createStudent(studentData: InsertStudent): Promise<Student> {
    const [student] = await db.insert(students).values(studentData).returning();
    return student;
  }

  async getStudentsBySchoolId(schoolId: number): Promise<Student[]> {
    return await db.select().from(students).where(eq(students.schoolId, schoolId));
  }

  async getStudentByIdAndSchool(studentId: string, schoolId: number): Promise<Student | undefined> {
    const [student] = await db
      .select()
      .from(students)
      .where(and(eq(students.studentId, studentId), eq(students.schoolId, schoolId)));
    return student;
  }

  async getStudentByPhoneAndSchool(parentPhone: string, schoolId: number): Promise<Student[]> {
    return await db
      .select()
      .from(students)
      .where(and(eq(students.parentPhone, parentPhone), eq(students.schoolId, schoolId)));
  }

  async updateStudent(studentId: number, studentData: Partial<InsertStudent>): Promise<Student> {
    const [student] = await db
      .update(students)
      .set({ ...studentData, updatedAt: new Date() })
      .where(eq(students.id, studentId))
      .returning();
    return student;
  }

  // Student fee operations
  async createStudentFee(studentFeeData: InsertStudentFee): Promise<StudentFee> {
    const [studentFee] = await db.insert(studentFees).values(studentFeeData).returning();
    return studentFee;
  }

  async getStudentFeesByStudentId(studentId: number): Promise<StudentFee[]> {
    return await db.select().from(studentFees).where(eq(studentFees.studentId, studentId));
  }

  async updateStudentFee(studentFeeId: number, studentFeeData: Partial<InsertStudentFee>): Promise<StudentFee> {
    const [studentFee] = await db
      .update(studentFees)
      .set({ ...studentFeeData, updatedAt: new Date() })
      .where(eq(studentFees.id, studentFeeId))
      .returning();
    return studentFee;
  }

  // Transaction operations
  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db.insert(transactions).values(transactionData).returning();
    return transaction;
  }

  async getTransactionsByStudentFeeId(studentFeeId: number): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.studentFeeId, studentFeeId))
      .orderBy(desc(transactions.createdAt));
  }

  // Receipt template operations
  async createReceiptTemplate(templateData: InsertReceiptTemplate): Promise<ReceiptTemplate> {
    const [template] = await db.insert(receiptTemplates).values(templateData).returning();
    return template;
  }

  async getReceiptTemplatesBySchoolId(schoolId: number): Promise<ReceiptTemplate[]> {
    return await db.select().from(receiptTemplates).where(eq(receiptTemplates.schoolId, schoolId));
  }

  // Reminder config operations
  async createReminderConfig(configData: InsertReminderConfig): Promise<ReminderConfig> {
    const [config] = await db.insert(reminderConfigs).values(configData).returning();
    return config;
  }

  async getReminderConfigsBySchoolId(schoolId: number): Promise<ReminderConfig[]> {
    return await db.select().from(reminderConfigs).where(eq(reminderConfigs.schoolId, schoolId));
  }
}

export const storage = new DatabaseStorage();