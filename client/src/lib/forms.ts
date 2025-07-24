// Utility functions for form handling

export interface FormSubmissionData {
  formTypeId: number;
  fields: Array<{
    fieldName: string;
    fieldValue: string;
    fieldType?: string;
  }>;
  metadata?: Record<string, any>;
}

export interface FormSubmissionResponse {
  success: boolean;
  submissionId?: number;
  message?: string;
  error?: string;
  details?: any;
}

export async function submitForm(data: FormSubmissionData): Promise<FormSubmissionResponse> {
  try {
    const response = await fetch('/api/forms/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Form submission failed',
        details: result.details,
      };
    }

    return result;
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      error: 'Network error. Please try again later.',
    };
  }
}

export async function getFormTypes() {
  try {
    const response = await fetch('/api/forms/types');
    if (!response.ok) {
      throw new Error('Failed to fetch form types');
    }
    const data = await response.json();
    return data.formTypes;
  } catch (error) {
    console.error('Error fetching form types:', error);
    return [];
  }
}

// Helper to convert form data to submission format
export function prepareFormSubmission(
  formTypeId: number,
  formData: Record<string, any>
): FormSubmissionData {
  const fields = Object.entries(formData).map(([fieldName, fieldValue]) => ({
    fieldName,
    fieldValue: String(fieldValue),
    fieldType: typeof fieldValue === 'number' ? 'number' : 'text',
  }));

  return {
    formTypeId,
    fields,
  };
}