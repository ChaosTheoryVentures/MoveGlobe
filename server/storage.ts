import { 
  users, 
  type User, 
  type InsertUser,
  formTypes,
  formSubmissions,
  formFields,
  formAttachments,
  type FormType,
  type InsertFormType,
  type FormSubmission,
  type InsertFormSubmission,
  type FormField,
  type InsertFormField,
  type FormAttachment,
  type InsertFormAttachment
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Form Type methods
  getFormType(id: number): Promise<FormType | undefined>;
  getFormTypeByName(name: string): Promise<FormType | undefined>;
  getAllFormTypes(activeOnly?: boolean): Promise<FormType[]>;
  createFormType(formType: InsertFormType): Promise<FormType>;
  updateFormType(id: number, formType: Partial<InsertFormType>): Promise<FormType | undefined>;

  // Form Submission methods
  createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission>;
  getFormSubmission(id: number): Promise<FormSubmission | undefined>;
  getFormSubmissions(filters?: {
    formTypeId?: number;
    status?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{ submissions: FormSubmission[]; total: number }>;
  updateFormSubmissionStatus(id: number, status: string, processedAt?: Date): Promise<FormSubmission | undefined>;

  // Form Field methods
  getFormFields(submissionId: number): Promise<FormField[]>;
  createFormFields(fields: InsertFormField[]): Promise<FormField[]>;

  // Form Attachment methods
  createFormAttachment(attachment: InsertFormAttachment): Promise<FormAttachment>;
  getFormAttachments(submissionId: number): Promise<FormAttachment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private formTypes: Map<number, FormType>;
  private formSubmissions: Map<number, FormSubmission>;
  private formFields: Map<number, FormField[]>;
  private formAttachments: Map<number, FormAttachment[]>;
  private currentUserId: number;
  private currentFormTypeId: number;
  private currentSubmissionId: number;
  private currentFieldId: number;
  private currentAttachmentId: number;

  constructor() {
    this.users = new Map();
    this.formTypes = new Map();
    this.formSubmissions = new Map();
    this.formFields = new Map();
    this.formAttachments = new Map();
    this.currentUserId = 1;
    this.currentFormTypeId = 1;
    this.currentSubmissionId = 1;
    this.currentFieldId = 1;
    this.currentAttachmentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Form Type methods
  async getFormType(id: number): Promise<FormType | undefined> {
    return this.formTypes.get(id);
  }

  async getFormTypeByName(name: string): Promise<FormType | undefined> {
    return Array.from(this.formTypes.values()).find(
      (formType) => formType.name === name
    );
  }

  async getAllFormTypes(activeOnly = true): Promise<FormType[]> {
    const types = Array.from(this.formTypes.values());
    return activeOnly ? types.filter(t => t.isActive) : types;
  }

  async createFormType(formType: InsertFormType): Promise<FormType> {
    const id = this.currentFormTypeId++;
    const newFormType: FormType = {
      id,
      ...formType,
      isActive: formType.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.formTypes.set(id, newFormType);
    return newFormType;
  }

  async updateFormType(id: number, formType: Partial<InsertFormType>): Promise<FormType | undefined> {
    const existing = this.formTypes.get(id);
    if (!existing) return undefined;
    
    const updated: FormType = {
      ...existing,
      ...formType,
      updatedAt: new Date(),
    };
    this.formTypes.set(id, updated);
    return updated;
  }

  // Form Submission methods
  async createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission> {
    const id = this.currentSubmissionId++;
    const { fields, ...submissionData } = submission;
    
    const newSubmission: FormSubmission = {
      id,
      ...submissionData,
      status: submissionData.status ?? "pending",
      createdAt: new Date(),
      processedAt: null,
    };
    
    this.formSubmissions.set(id, newSubmission);
    
    // Create fields if provided
    if (fields && fields.length > 0) {
      const fieldRecords = await this.createFormFields(
        fields.map(field => ({
          submissionId: id,
          ...field,
        }))
      );
      this.formFields.set(id, fieldRecords);
    }
    
    return newSubmission;
  }

  async getFormSubmission(id: number): Promise<FormSubmission | undefined> {
    return this.formSubmissions.get(id);
  }

  async getFormSubmissions(filters?: {
    formTypeId?: number;
    status?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{ submissions: FormSubmission[]; total: number }> {
    let submissions = Array.from(this.formSubmissions.values());
    
    if (filters) {
      if (filters.formTypeId !== undefined) {
        submissions = submissions.filter(s => s.formTypeId === filters.formTypeId);
      }
      if (filters.status) {
        submissions = submissions.filter(s => s.status === filters.status);
      }
      if (filters.startDate) {
        submissions = submissions.filter(s => s.createdAt >= filters.startDate);
      }
      if (filters.endDate) {
        submissions = submissions.filter(s => s.createdAt <= filters.endDate);
      }
    }
    
    const total = submissions.length;
    
    // Apply pagination
    if (filters?.offset !== undefined) {
      submissions = submissions.slice(filters.offset);
    }
    if (filters?.limit !== undefined) {
      submissions = submissions.slice(0, filters.limit);
    }
    
    return { submissions, total };
  }

  async updateFormSubmissionStatus(id: number, status: string, processedAt?: Date): Promise<FormSubmission | undefined> {
    const submission = this.formSubmissions.get(id);
    if (!submission) return undefined;
    
    const updated: FormSubmission = {
      ...submission,
      status,
      processedAt: processedAt ?? new Date(),
    };
    this.formSubmissions.set(id, updated);
    return updated;
  }

  // Form Field methods
  async getFormFields(submissionId: number): Promise<FormField[]> {
    return this.formFields.get(submissionId) || [];
  }

  async createFormFields(fields: InsertFormField[]): Promise<FormField[]> {
    const createdFields: FormField[] = [];
    
    for (const field of fields) {
      const id = this.currentFieldId++;
      const newField: FormField = {
        id,
        ...field,
        createdAt: new Date(),
      };
      createdFields.push(newField);
      
      // Group fields by submission ID
      const submissionFields = this.formFields.get(field.submissionId) || [];
      submissionFields.push(newField);
      this.formFields.set(field.submissionId, submissionFields);
    }
    
    return createdFields;
  }

  // Form Attachment methods
  async createFormAttachment(attachment: InsertFormAttachment): Promise<FormAttachment> {
    const id = this.currentAttachmentId++;
    const newAttachment: FormAttachment = {
      id,
      ...attachment,
      createdAt: new Date(),
    };
    
    const submissionAttachments = this.formAttachments.get(attachment.submissionId) || [];
    submissionAttachments.push(newAttachment);
    this.formAttachments.set(attachment.submissionId, submissionAttachments);
    
    return newAttachment;
  }

  async getFormAttachments(submissionId: number): Promise<FormAttachment[]> {
    return this.formAttachments.get(submissionId) || [];
  }
}

// Initialize storage based on environment
let storage: IStorage = new MemStorage(); // Default to MemStorage

// Function to initialize storage
export async function initializeStorage(): Promise<void> {
  if (process.env.DATABASE_URL) {
    try {
      const { DrizzleStorage } = await import("./drizzle-storage");
      storage = new DrizzleStorage();
      console.log("Using PostgreSQL database storage");
    } catch (error) {
      console.error("Failed to initialize DrizzleStorage:", error);
      console.log("Falling back to in-memory storage");
      storage = new MemStorage();
    }
  } else {
    console.log("Using in-memory storage (no DATABASE_URL found)");
  }
}

export { storage };
