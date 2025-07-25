import type { FormSubmission, FormType, FormField } from "@shared/schema";

interface SlackMessage {
  text: string;
  blocks?: any[];
  attachments?: any[];
}

interface SlackNotificationData {
  submission: FormSubmission;
  formType: FormType;
  fields: FormField[];
}

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

export class SlackNotificationService {
  private webhookUrl: string | undefined;

  constructor() {
    this.webhookUrl = process.env.SLACK_WEBHOOK_URL;
    console.log("Slack webhook URL configured:", !!this.webhookUrl);
  }

  async sendFormSubmissionNotification(data: SlackNotificationData): Promise<void> {
    if (!this.webhookUrl) {
      console.log("Slack webhook URL not configured, skipping notification");
      return;
    }

    try {
      const message = this.formatFormSubmissionMessage(data);
      await this.sendWithRetry(message);
    } catch (error) {
      console.error("Failed to send Slack notification after retries:", error);
    }
  }

  private formatFormSubmissionMessage(data: SlackNotificationData): SlackMessage {
    const { submission, formType, fields } = data;
    
    // Get key fields
    const nameField = fields.find(f => f.fieldName === "name");
    const emailField = fields.find(f => f.fieldName === "email");
    const companyField = fields.find(f => f.fieldName === "company");
    const messageField = fields.find(f => f.fieldName === "message");
    
    // Format timestamp
    const timestamp = new Date(submission.createdAt!).toLocaleString("en-US", {
      timeZone: "Europe/Amsterdam",
      dateStyle: "medium",
      timeStyle: "short"
    });

    // Determine emoji and color based on form type
    const formTypeConfig = {
      contact: { emoji: "📧", color: "#36a64f" },
      ai_analysis: { emoji: "🤖", color: "#4A90E2" },
      application: { emoji: "📝", color: "#FF6B6B" }
    };
    
    const config = formTypeConfig[formType.name as keyof typeof formTypeConfig] || 
                  { emoji: "📋", color: "#999999" };

    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${config.emoji} New ${formType.description || formType.name}`,
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:*\n${nameField?.fieldValue || "Not provided"}`
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${emailField?.fieldValue || "Not provided"}`
          }
        ]
      }
    ];

    // Add company field if present
    if (companyField?.fieldValue) {
      blocks.push({
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Company:*\n${companyField.fieldValue}`
          },
          {
            type: "mrkdwn",
            text: `*Form Type:*\n${formType.name}`
          }
        ]
      });
    }

    // Add message if present
    if (messageField?.fieldValue) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Message:*\n${messageField.fieldValue.substring(0, 500)}${messageField.fieldValue.length > 500 ? "..." : ""}`
        }
      });
    }

    // Add metadata
    blocks.push(
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Submitted: ${timestamp} | ID: #${submission.id} | IP: ${submission.ipAddress || "Unknown"}`
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<${process.env.APP_URL || "http://localhost:5000"}/admin/form-submissions|View in Admin Panel>`
        }
      }
    );

    return {
      text: `New form submission: ${formType.name}`,
      blocks,
      attachments: [{
        color: config.color
      }]
    };
  }

  private async sendWithRetry(message: SlackMessage, attempt = 1): Promise<void> {
    try {
      const response = await fetch(this.webhookUrl!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error(`Slack API responded with ${response.status}: ${await response.text()}`);
      }
    } catch (error) {
      if (attempt < MAX_RETRY_ATTEMPTS) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`Slack notification failed, retrying in ${delay}ms (attempt ${attempt}/${MAX_RETRY_ATTEMPTS})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.sendWithRetry(message, attempt + 1);
      }
      throw error;
    }
  }
}

// Create a singleton instance getter to ensure env vars are loaded
let instance: SlackNotificationService | null = null;

export const getSlackNotificationService = () => {
  if (!instance) {
    instance = new SlackNotificationService();
  }
  return instance;
};