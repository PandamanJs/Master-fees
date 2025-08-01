import type { 
  User, NewUser, 
  School, NewSchool,
  Student, NewStudent,
  FeeCategory, NewFeeCategory,
  StudentFee, NewStudentFee,
  Payment, NewPayment,
  Notification, NewNotification,
  AcademicYear, NewAcademicYear,
  ContactMessage, NewContactMessage,
  JobApplication, NewJobApplication
} from "@shared/schema";

export interface IStorage {
  // User operations
  createUser(user: NewUser): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, updates: Partial<User>): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;

  // School operations
  createSchool(school: NewSchool): Promise<School>;
  getSchoolById(id: number): Promise<School | null>;
  getAllSchools(): Promise<School[]>;
  updateSchool(id: number, updates: Partial<School>): Promise<School | null>;

  // Student operations
  createStudent(student: NewStudent): Promise<Student>;
  getStudentById(id: number): Promise<Student | null>;
  getStudentsBySchool(schoolId: number): Promise<Student[]>;
  getStudentsByParent(parentId: number): Promise<Student[]>;
  updateStudent(id: number, updates: Partial<Student>): Promise<Student | null>;

  // Fee category operations
  createFeeCategory(category: NewFeeCategory): Promise<FeeCategory>;
  getFeeCategoriesBySchool(schoolId: number): Promise<FeeCategory[]>;
  updateFeeCategory(id: number, updates: Partial<FeeCategory>): Promise<FeeCategory | null>;

  // Student fee operations
  createStudentFee(fee: NewStudentFee): Promise<StudentFee>;
  getStudentFeesByStudent(studentId: number): Promise<StudentFee[]>;
  getPendingFeesByStudent(studentId: number): Promise<StudentFee[]>;
  updateStudentFee(id: number, updates: Partial<StudentFee>): Promise<StudentFee | null>;

  // Payment operations
  createPayment(payment: NewPayment): Promise<Payment>;
  getPaymentById(id: number): Promise<Payment | null>;
  getPaymentsByStudent(studentId: number): Promise<Payment[]>;
  updatePayment(id: number, updates: Partial<Payment>): Promise<Payment | null>;

  // Notification operations
  createNotification(notification: NewNotification): Promise<Notification>;
  getNotificationsByUser(userId: number): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<boolean>;

  // Academic year operations
  createAcademicYear(year: NewAcademicYear): Promise<AcademicYear>;
  getAcademicYearsBySchool(schoolId: number): Promise<AcademicYear[]>;
  getActiveAcademicYear(schoolId: number): Promise<AcademicYear | null>;

  // Contact message operations
  createContactMessage(message: NewContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | null>;
  updateContactMessage(id: number, updates: Partial<ContactMessage>): Promise<ContactMessage | null>;
  markContactMessageAsRead(id: number): Promise<boolean>;

  // Additional student fee methods
  getStudentFeeById(id: number): Promise<StudentFee | null>;
  
  // Dashboard data methods
  getUsers(): Promise<User[]>;
  getPayments(): Promise<Payment[]>;
  getContacts(): Promise<ContactMessage[]>;
  getSMSSettings(): Promise<any[]>;

  // Job Applications
  createJobApplication(application: NewJobApplication): Promise<JobApplication>;
  getAllJobApplications(): Promise<JobApplication[]>;
  getJobApplicationById(id: number): Promise<JobApplication | null>;

  // Aptitude Tests
  getAllAptitudeTests(): Promise<any[]>;
  createAptitudeTest(test: any): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private schools: Map<number, School> = new Map();
  private students: Map<number, Student> = new Map();
  private feeCategories: Map<number, FeeCategory> = new Map();
  private studentFees: Map<number, StudentFee> = new Map();
  private payments: Map<number, Payment> = new Map();
  private notifications: Map<number, Notification> = new Map();
  private academicYears: Map<number, AcademicYear> = new Map();
  private contactMessages: Map<number, ContactMessage> = new Map();
  private jobApplications: Map<number, JobApplication> = new Map();
  private aptitudeTests: Map<string, any> = new Map();
  private currentUserId = 1;
  private currentSchoolId = 1;
  private currentStudentId = 1;
  private currentFeeCategoryId = 1;
  private currentStudentFeeId = 1;
  private currentPaymentId = 1;
  private currentNotificationId = 1;
  private currentAcademicYearId = 1;
  private currentContactMessageId = 1;
  private currentJobApplicationId = 1;

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed demo data for production testing
    const demoSchool: School = {
      id: 1,
      name: "Twalumbu Education Centre",
      address: "123 Education Street",
      city: "Mumbai",
      state: "Maharashtra", 
      pincode: "400001",
      contactEmail: "admin@twalumbu.edu.in",
      contactPhone: "+91-9876543210",
      principalName: "Dr. Rajesh Kumar",
      registrationNumber: "MH-SCH-2024-001",
      isActive: true,
      createdAt: new Date()
    };
    this.schools.set(1, demoSchool);
    this.currentSchoolId = 2;

    // Demo admin user
    const adminUser: User = {
      id: 1,
      email: "admin@twalumbu.edu.in",
      password: "$2b$10$hashedpassword", // In production, use proper hashing
      firstName: "Admin",
      lastName: "User",
      role: "school_admin",
      schoolId: 1,
      phoneNumber: "+91-9876543210",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(1, adminUser);

    // Demo parent user
    const parentUser: User = {
      id: 2,
      email: "parent@example.com",
      password: "$2b$10$hashedpassword",
      firstName: "Rajesh",
      lastName: "Sharma",
      role: "parent",
      schoolId: 1,
      phoneNumber: "+91-9876543211",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(2, parentUser);
    this.currentUserId = 3;

    // Demo student
    const student: Student = {
      id: 1,
      schoolId: 1,
      studentId: "TEC-2024-001",
      firstName: "Aarav",
      lastName: "Sharma",
      class: "Class 10",
      section: "A",
      rollNumber: "10A001",
      dateOfBirth: new Date("2009-05-15"),
      parentId: 2,
      guardianName: "Rajesh Sharma",
      guardianPhone: "+91-9876543211",
      guardianEmail: "parent@example.com",
      address: "456 Student Street, Mumbai",
      isActive: true,
      admissionDate: new Date("2024-04-01"),
      createdAt: new Date()
    };
    this.students.set(1, student);
    this.currentStudentId = 2;

    // Demo fee categories
    const tuitionFee: FeeCategory = {
      id: 1,
      schoolId: 1,
      name: "Tuition Fee",
      description: "Monthly tuition fee for academic year 2024-25",
      amount: "5000.00",
      frequency: "monthly",
      dueDay: 10,
      isActive: true,
      createdAt: new Date()
    };
    this.feeCategories.set(1, tuitionFee);

    const transportFee: FeeCategory = {
      id: 2,
      schoolId: 1,
      name: "Transport Fee",
      description: "Monthly bus transportation fee",
      amount: "1500.00",
      frequency: "monthly",
      dueDay: 10,
      isActive: true,
      createdAt: new Date()
    };
    this.feeCategories.set(2, transportFee);
    this.currentFeeCategoryId = 3;

    // Demo academic year
    const academicYear: AcademicYear = {
      id: 1,
      schoolId: 1,
      name: "2024-25",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-03-31"),
      isActive: true,
      createdAt: new Date()
    };
    this.academicYears.set(1, academicYear);
    this.currentAcademicYearId = 2;

    // Demo student fees
    const studentTuitionFee: StudentFee = {
      id: 1,
      studentId: 1,
      feeCategoryId: 1,
      amount: "5000.00",
      dueDate: new Date("2024-12-10"),
      status: "pending",
      academicYear: "2024-25",
      createdAt: new Date()
    };
    this.studentFees.set(1, studentTuitionFee);

    const studentTransportFee: StudentFee = {
      id: 2,
      studentId: 1,
      feeCategoryId: 2,
      amount: "1500.00",
      dueDate: new Date("2024-12-10"),
      status: "pending",
      academicYear: "2024-25",
      createdAt: new Date()
    };
    this.studentFees.set(2, studentTransportFee);
    this.currentStudentFeeId = 3;

    // Demo payments for dashboard visualization
    const payment1: Payment = {
      id: 1,
      studentId: 1,
      amount: "5000.00",
      paymentMethod: "upi",
      transactionId: "TXN001",
      status: "completed",
      paymentDate: new Date(),
      academicYear: "2024-25",
      feeType: "tuition",
      receiptNumber: "REC001",
      createdAt: new Date()
    };
    this.payments.set(1, payment1);

    const payment2: Payment = {
      id: 2,
      studentId: 1,
      amount: "1500.00",
      paymentMethod: "card",
      transactionId: "TXN002",
      status: "completed",
      paymentDate: new Date(),
      academicYear: "2024-25",
      feeType: "transport",
      receiptNumber: "REC002",
      createdAt: new Date()
    };
    this.payments.set(2, payment2);

    const payment3: Payment = {
      id: 3,
      studentId: 1,
      amount: "2500.00",
      paymentMethod: "upi",
      transactionId: "TXN003", 
      status: "pending",
      paymentDate: new Date(),
      academicYear: "2024-25",
      feeType: "tuition",
      receiptNumber: "REC003",
      createdAt: new Date()
    };
    this.payments.set(3, payment3);
    this.currentPaymentId = 4;
  }

  // User operations
  async createUser(user: NewUser): Promise<User> {
    const id = this.currentUserId++;
    const newUser: User = {
      ...user,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, newUser);
    return newUser;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return Array.from(this.users.values()).find(user => user.email === email) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  // School operations
  async createSchool(school: NewSchool): Promise<School> {
    const id = this.currentSchoolId++;
    const newSchool: School = {
      ...school,
      id,
      createdAt: new Date()
    };
    this.schools.set(id, newSchool);
    return newSchool;
  }

  async getSchoolById(id: number): Promise<School | null> {
    return this.schools.get(id) || null;
  }

  async getAllSchools(): Promise<School[]> {
    return Array.from(this.schools.values());
  }

  async updateSchool(id: number, updates: Partial<School>): Promise<School | null> {
    const school = this.schools.get(id);
    if (!school) return null;
    
    const updatedSchool = { ...school, ...updates };
    this.schools.set(id, updatedSchool);
    return updatedSchool;
  }

  // Student operations
  async createStudent(student: NewStudent): Promise<Student> {
    const id = this.currentStudentId++;
    const newStudent: Student = {
      ...student,
      id,
      createdAt: new Date()
    };
    this.students.set(id, newStudent);
    return newStudent;
  }

  async getStudentById(id: number): Promise<Student | null> {
    return this.students.get(id) || null;
  }

  async getStudentsBySchool(schoolId: number): Promise<Student[]> {
    return Array.from(this.students.values()).filter(student => student.schoolId === schoolId);
  }

  async getStudentsByParent(parentId: number): Promise<Student[]> {
    return Array.from(this.students.values()).filter(student => student.parentId === parentId);
  }

  async updateStudent(id: number, updates: Partial<Student>): Promise<Student | null> {
    const student = this.students.get(id);
    if (!student) return null;
    
    const updatedStudent = { ...student, ...updates };
    this.students.set(id, updatedStudent);
    return updatedStudent;
  }

  // Fee category operations
  async createFeeCategory(category: NewFeeCategory): Promise<FeeCategory> {
    const id = this.currentFeeCategoryId++;
    const newCategory: FeeCategory = {
      ...category,
      id,
      createdAt: new Date()
    };
    this.feeCategories.set(id, newCategory);
    return newCategory;
  }

  async getFeeCategoriesBySchool(schoolId: number): Promise<FeeCategory[]> {
    return Array.from(this.feeCategories.values()).filter(category => category.schoolId === schoolId);
  }

  async updateFeeCategory(id: number, updates: Partial<FeeCategory>): Promise<FeeCategory | null> {
    const category = this.feeCategories.get(id);
    if (!category) return null;
    
    const updatedCategory = { ...category, ...updates };
    this.feeCategories.set(id, updatedCategory);
    return updatedCategory;
  }

  // Student fee operations
  async createStudentFee(fee: NewStudentFee): Promise<StudentFee> {
    const id = this.currentStudentFeeId++;
    const newFee: StudentFee = {
      ...fee,
      id,
      createdAt: new Date()
    };
    this.studentFees.set(id, newFee);
    return newFee;
  }

  async getStudentFeesByStudent(studentId: number): Promise<StudentFee[]> {
    return Array.from(this.studentFees.values()).filter(fee => fee.studentId === studentId);
  }

  async getPendingFeesByStudent(studentId: number): Promise<StudentFee[]> {
    return Array.from(this.studentFees.values()).filter(
      fee => fee.studentId === studentId && fee.status === 'pending'
    );
  }

  async updateStudentFee(id: number, updates: Partial<StudentFee>): Promise<StudentFee | null> {
    const fee = this.studentFees.get(id);
    if (!fee) return null;
    
    const updatedFee = { ...fee, ...updates };
    this.studentFees.set(id, updatedFee);
    return updatedFee;
  }

  async getStudentFeeById(id: number): Promise<StudentFee | null> {
    return this.studentFees.get(id) || null;
  }

  // Payment operations
  async createPayment(payment: NewPayment): Promise<Payment> {
    const id = this.currentPaymentId++;
    const newPayment: Payment = {
      ...payment,
      id,
      createdAt: new Date()
    };
    this.payments.set(id, newPayment);
    return newPayment;
  }

  async getPaymentById(id: number): Promise<Payment | null> {
    return this.payments.get(id) || null;
  }

  async getPaymentsByStudent(studentId: number): Promise<Payment[]> {
    const studentFeeIds = Array.from(this.studentFees.values())
      .filter(fee => fee.studentId === studentId)
      .map(fee => fee.id);
    
    return Array.from(this.payments.values()).filter(
      payment => studentFeeIds.includes(payment.studentFeeId)
    );
  }

  async updatePayment(id: number, updates: Partial<Payment>): Promise<Payment | null> {
    const payment = this.payments.get(id);
    if (!payment) return null;
    
    const updatedPayment = { ...payment, ...updates };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }

  // Notification operations
  async createNotification(notification: NewNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const newNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date()
    };
    this.notifications.set(id, newNotification);
    return newNotification;
  }

  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(notification => notification.userId === userId);
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;
    
    const updatedNotification = { ...notification, isRead: true };
    this.notifications.set(id, updatedNotification);
    return true;
  }

  // Academic year operations
  async createAcademicYear(year: NewAcademicYear): Promise<AcademicYear> {
    const id = this.currentAcademicYearId++;
    const newYear: AcademicYear = {
      ...year,
      id,
      createdAt: new Date()
    };
    this.academicYears.set(id, newYear);
    return newYear;
  }

  async getAcademicYearsBySchool(schoolId: number): Promise<AcademicYear[]> {
    return Array.from(this.academicYears.values()).filter(year => year.schoolId === schoolId);
  }

  async getActiveAcademicYear(schoolId: number): Promise<AcademicYear | null> {
    return Array.from(this.academicYears.values()).find(
      year => year.schoolId === schoolId && year.isActive
    ) || null;
  }

  // Contact message operations
  async createContactMessage(message: NewContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const newMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContactMessageById(id: number): Promise<ContactMessage | null> {
    return this.contactMessages.get(id) || null;
  }

  async updateContactMessage(id: number, updates: Partial<ContactMessage>): Promise<ContactMessage | null> {
    const message = this.contactMessages.get(id);
    if (!message) return null;
    
    const updatedMessage = { ...message, ...updates };
    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }

  async markContactMessageAsRead(id: number): Promise<boolean> {
    const message = this.contactMessages.get(id);
    if (!message) return false;
    
    const updatedMessage = { ...message, isRead: true, status: 'read' as const };
    this.contactMessages.set(id, updatedMessage);
    return true;
  }

  // Dashboard data methods
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }

  async getContacts(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getSMSSettings(): Promise<any[]> {
    // Return empty array for now, can be expanded when SMS settings are implemented
    return [];
  }

  // Job Application methods
  async createJobApplication(application: NewJobApplication): Promise<JobApplication> {
    const newApplication: JobApplication = {
      ...application,
      id: this.currentJobApplicationId++,
      appliedAt: new Date(),
    };
    this.jobApplications.set(newApplication.id, newApplication);
    return newApplication;
  }

  async getAllJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values());
  }

  async getJobApplicationById(id: number): Promise<JobApplication | null> {
    return this.jobApplications.get(id) || null;
  }

  // Aptitude Tests
  async getAllAptitudeTests(): Promise<any[]> {
    return Array.from(this.aptitudeTests.values());
  }

  async createAptitudeTest(test: any): Promise<any> {
    const testWithId = {
      ...test,
      id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date()
    };
    this.aptitudeTests.set(testWithId.id, testWithId);
    return testWithId;
  }
}

export const storage = new MemStorage();
