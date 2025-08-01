import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { pgTable, text, integer, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

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

export const insertAptitudeTestSchema = createInsertSchema(aptitudeTests, {
  candidateName: z.string().min(2, "Name is required"),
  candidateEmail: z.string().email("Valid email is required"),
  candidatePhone: z.string().min(10, "Valid phone number is required"),
  testType: z.enum(["frontend", "backend"]),
  experience: z.string().min(1, "Experience level is required"),
  answers: z.record(z.number()),
  codingAnswer: z.string().optional(),
  timeSpent: z.number().min(0),
}).omit({
  id: true,
  submittedAt: true,
  score: true,
  aiAnalysis: true,
  status: true,
  adminNotes: true,
});

export const selectAptitudeTestSchema = createSelectSchema(aptitudeTests);

export type AptitudeTest = typeof aptitudeTests.$inferSelect;
export type InsertAptitudeTest = z.infer<typeof insertAptitudeTestSchema>;

export const aptitudeRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  testType: z.enum(["frontend", "backend"], {
    required_error: "Please select a test type",
  }),
  experience: z.string().min(1, "Please select your experience level"),
});

export type AptitudeRegistration = z.infer<typeof aptitudeRegistrationSchema>;

// Enhanced multi-category form schema
export const candidateFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  experience: z.string().min(1, "Please specify your experience level"),
  testTypes: z.array(z.string()).min(1, "Please select at least one test category"),
});

export type CandidateForm = z.infer<typeof candidateFormSchema>;