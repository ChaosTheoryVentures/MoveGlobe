import { db } from "./db";
import { eq, and, gte, lte, desc, sql } from "drizzle-orm";
import { 
  users, 
  formTypes,
  formSubmissions,
  formFields,
  formAttachments,
  type User, 
  type InsertUser,
  type FormType,
  type InsertFormType,
  type FormSubmission,
  type InsertFormSubmission,
  type FormField,
  type InsertFormField,
  type FormAttachment,
  type InsertFormAttachment
} from "@shared/schema";
import { IStorage } from "./storage";

export class DrizzleStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Form Type methods
  async getFormType(id: number): Promise<FormType | undefined> {
    const result = await db.select().from(formTypes).where(eq(formTypes.id, id)).limit(1);
    return result[0];
  }

  async getFormTypeByName(name: string): Promise<FormType | undefined> {
    const result = await db.select().from(formTypes).where(eq(formTypes.name, name)).limit(1);
    return result[0];
  }

  async getAllFormTypes(activeOnly = true): Promise<FormType[]> {
    if (activeOnly) {
      return await db.select().from(formTypes).where(eq(formTypes.isActive, true));
    }
    return await db.select().from(formTypes);
  }

  async createFormType(formType: InsertFormType): Promise<FormType> {
    const result = await db.insert(formTypes).values(formType).returning();
    return result[0];
  }

  async updateFormType(id: number, formType: Partial<InsertFormType>): Promise<FormType | undefined> {
    const result = await db.update(formTypes)
      .set({ ...formType, updatedAt: new Date() })
      .where(eq(formTypes.id, id))
      .returning();
    return result[0];
  }

  // Form Submission methods
  async createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission> {
    const { fields, ...submissionData } = submission;
    
    // Start a transaction
    return await db.transaction(async (tx) => {
      // Create the submission
      const [newSubmission] = await tx.insert(formSubmissions)
        .values(submissionData)
        .returning();
      
      // Create fields if provided
      if (fields && fields.length > 0) {
        await tx.insert(formFields).values(
          fields.map(field => ({
            submissionId: newSubmission.id,
            ...field,
          }))
        );
      }
      
      return newSubmission;
    });
  }

  async getFormSubmission(id: number): Promise<FormSubmission | undefined> {
    const result = await db.select().from(formSubmissions).where(eq(formSubmissions.id, id)).limit(1);
    return result[0];
  }

  async getFormSubmissions(filters?: {
    formTypeId?: number;
    status?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{ submissions: FormSubmission[]; total: number }> {
    let query = db.select().from(formSubmissions);
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(formSubmissions);
    
    const conditions = [];
    
    if (filters?.formTypeId !== undefined) {
      conditions.push(eq(formSubmissions.formTypeId, filters.formTypeId));
    }
    if (filters?.status) {
      conditions.push(eq(formSubmissions.status, filters.status));
    }
    if (filters?.startDate) {
      conditions.push(gte(formSubmissions.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte(formSubmissions.createdAt, filters.endDate));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
      countQuery = countQuery.where(and(...conditions));
    }
    
    // Get total count
    const [{ count }] = await countQuery;
    
    // Apply ordering, limit and offset
    query = query.orderBy(desc(formSubmissions.createdAt));
    
    if (filters?.limit !== undefined) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset !== undefined) {
      query = query.offset(filters.offset);
    }
    
    const submissions = await query;
    
    return { submissions, total: Number(count) };
  }

  async updateFormSubmissionStatus(id: number, status: string, processedAt?: Date): Promise<FormSubmission | undefined> {
    const result = await db.update(formSubmissions)
      .set({ 
        status, 
        processedAt: processedAt || new Date() 
      })
      .where(eq(formSubmissions.id, id))
      .returning();
    return result[0];
  }

  // Form Field methods
  async getFormFields(submissionId: number): Promise<FormField[]> {
    return await db.select()
      .from(formFields)
      .where(eq(formFields.submissionId, submissionId));
  }

  async createFormFields(fields: InsertFormField[]): Promise<FormField[]> {
    const result = await db.insert(formFields).values(fields).returning();
    return result;
  }

  // Form Attachment methods
  async createFormAttachment(attachment: InsertFormAttachment): Promise<FormAttachment> {
    const result = await db.insert(formAttachments).values(attachment).returning();
    return result[0];
  }

  async getFormAttachments(submissionId: number): Promise<FormAttachment[]> {
    return await db.select()
      .from(formAttachments)
      .where(eq(formAttachments.submissionId, submissionId));
  }
}