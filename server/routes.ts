import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFormSubmissionSchema, insertFormTypeSchema } from "@shared/schema";
import { z } from "zod";
import { requireAuth, verifyAdminPassword } from "./middleware/auth";
import { getSlackNotificationService } from "./services/slack-notifications";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // Authentication endpoints
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      
      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }
      
      const isValid = await verifyAdminPassword(password);
      
      if (isValid) {
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            return res.status(500).json({ error: "Failed to save session" });
          }
          res.json({ success: true, message: "Login successful" });
        });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true, message: "Logout successful" });
    });
  });

  app.get("/api/auth/check", (req: Request, res: Response) => {
    res.json({ authenticated: !!req.session.isAuthenticated });
  });

  // Form Types endpoints
  app.get("/api/forms/types", async (req: Request, res: Response) => {
    try {
      const activeOnly = req.query.activeOnly !== "false";
      const formTypes = await storage.getAllFormTypes(activeOnly);
      res.json({ formTypes });
    } catch (error) {
      console.error("Error fetching form types:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forms/types/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const formType = await storage.getFormType(id);
      
      if (!formType) {
        return res.status(404).json({ error: "Form type not found" });
      }
      
      res.json({ formType });
    } catch (error) {
      console.error("Error fetching form type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/forms/types", async (req: Request, res: Response) => {
    try {
      const validatedData = insertFormTypeSchema.parse(req.body);
      const formType = await storage.createFormType(validatedData);
      res.status(201).json({ formType });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Error creating form type:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Form Submissions endpoints
  app.post("/api/forms/submit", async (req: Request, res: Response) => {
    try {
      // Get client info
      const ipAddress = req.ip || req.socket.remoteAddress || "";
      const userAgent = req.headers["user-agent"] || "";
      const referrer = req.headers["referer"] || "";

      // Prepare submission data
      const submissionData = {
        ...req.body,
        ipAddress,
        userAgent,
        referrer,
      };

      // Validate the submission
      const validatedData = insertFormSubmissionSchema.parse(submissionData);
      
      // Check if form type exists
      const formType = await storage.getFormType(validatedData.formTypeId);
      if (!formType || !formType.isActive) {
        return res.status(400).json({ error: "Invalid or inactive form type" });
      }

      // Create the submission
      const submission = await storage.createFormSubmission(validatedData);
      
      // Send Slack notification asynchronously
      // Don't await to avoid blocking the response
      getSlackNotificationService().sendFormSubmissionNotification({
        submission,
        formType,
        fields: validatedData.fields || []
      }).catch(error => {
        console.error("Error sending Slack notification:", error);
      });
      
      res.status(201).json({ 
        success: true, 
        submissionId: submission.id,
        message: "Form submitted successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      console.error("Error submitting form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forms/submissions", requireAuth, async (req: Request, res: Response) => {
    try {
      const filters = {
        formTypeId: req.query.formTypeId ? parseInt(req.query.formTypeId as string) : undefined,
        status: req.query.status as string | undefined,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      };

      const result = await storage.getFormSubmissions(filters);
      res.json(result);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forms/submissions/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const submission = await storage.getFormSubmission(id);
      
      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      // Get associated fields
      const fields = await storage.getFormFields(id);
      
      // Get associated attachments
      const attachments = await storage.getFormAttachments(id);
      
      res.json({ 
        submission,
        fields,
        attachments 
      });
    } catch (error) {
      console.error("Error fetching submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/forms/submissions/:id/status", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      const processedAt = status === "processed" ? new Date() : undefined;
      const updatedSubmission = await storage.updateFormSubmissionStatus(id, status, processedAt);
      
      if (!updatedSubmission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      
      res.json({ submission: updatedSubmission });
    } catch (error) {
      console.error("Error updating submission status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Initialize default form types on startup
  initializeDefaultFormTypes();

  const httpServer = createServer(app);

  return httpServer;
}

// Initialize default form types for the existing forms
async function initializeDefaultFormTypes() {
  const existingTypes = await storage.getAllFormTypes(false);
  
  if (existingTypes.length === 0) {
    // Create form type for contact form
    await storage.createFormType({
      name: "contact",
      description: "Contact form for general inquiries",
      schema: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1 },
          email: { type: "string", format: "email" },
          company: { type: "string" },
          message: { type: "string", minLength: 1 }
        },
        required: ["name", "email", "message"]
      },
      isActive: true
    });

    // Create form type for AI analysis form
    await storage.createFormType({
      name: "ai_analysis",
      description: "AI Analysis consultation form",
      schema: {
        type: "object",
        properties: {
          company: { type: "string", minLength: 1 },
          name: { type: "string", minLength: 1 },
          email: { type: "string", format: "email" },
          phone: { type: "string" },
          employees: { type: "string", enum: ["1-10", "11-50", "51-200", "201-500", "500+"] },
          challenges: { type: "string" },
          budget: { type: "string", enum: ["<10k", "10-50k", "50-100k", "100k+", "unsure"] },
          timeline: { type: "string", enum: ["asap", "1month", "3months", "6months", "exploring"] }
        },
        required: ["company", "name", "email"]
      },
      isActive: true
    });

    console.log("Default form types initialized");
  }
}
