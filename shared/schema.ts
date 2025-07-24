import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Form Types table - defines different types of forms
export const formTypes = pgTable("form_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  schema: jsonb("schema"), // JSON schema for validation
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Form Submissions table - stores all form submissions
export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formTypeId: integer("form_type_id").notNull().references(() => formTypes.id),
  status: varchar("status", { length: 50 }).default("pending"), // pending, processed, archived
  ipAddress: varchar("ip_address", { length: 45 }), // Supports IPv6
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  metadata: jsonb("metadata"), // Additional metadata
  createdAt: timestamp("created_at").defaultNow(),
  processedAt: timestamp("processed_at"),
}, (table) => {
  return {
    formTypeIdIdx: index("form_submissions_form_type_id_idx").on(table.formTypeId),
    statusIdx: index("form_submissions_status_idx").on(table.status),
    createdAtIdx: index("form_submissions_created_at_idx").on(table.createdAt),
  };
});

// Form Fields table - stores individual field values
export const formFields = pgTable("form_fields", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").notNull().references(() => formSubmissions.id, { onDelete: "cascade" }),
  fieldName: varchar("field_name", { length: 100 }).notNull(),
  fieldValue: text("field_value"),
  fieldType: varchar("field_type", { length: 50 }), // text, email, number, select, etc.
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
  return {
    submissionIdIdx: index("form_fields_submission_id_idx").on(table.submissionId),
    fieldNameIdx: index("form_fields_field_name_idx").on(table.fieldName),
  };
});

// Form Attachments table - for file uploads
export const formAttachments = pgTable("form_attachments", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").notNull().references(() => formSubmissions.id, { onDelete: "cascade" }),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  storageUrl: text("storage_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
  return {
    submissionIdIdx: index("form_attachments_submission_id_idx").on(table.submissionId),
  };
});

// Insert schemas for Zod validation
export const insertFormTypeSchema = createInsertSchema(formTypes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  fields: z.array(z.object({
    fieldName: z.string().min(1).max(100),
    fieldValue: z.string().optional(),
    fieldType: z.string().optional(),
  })),
});

export const insertFormFieldSchema = createInsertSchema(formFields).omit({
  id: true,
  createdAt: true,
});

export const insertFormAttachmentSchema = createInsertSchema(formAttachments).omit({
  id: true,
  createdAt: true,
});

// Types
export type FormType = typeof formTypes.$inferSelect;
export type InsertFormType = z.infer<typeof insertFormTypeSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormField = typeof formFields.$inferSelect;
export type InsertFormField = z.infer<typeof insertFormFieldSchema>;
export type FormAttachment = typeof formAttachments.$inferSelect;
export type InsertFormAttachment = z.infer<typeof insertFormAttachmentSchema>;
