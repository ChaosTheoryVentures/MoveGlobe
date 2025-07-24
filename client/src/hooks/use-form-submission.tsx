import { useMutation, useQuery } from '@tanstack/react-query';
import { submitForm, getFormTypes, prepareFormSubmission } from '@/lib/forms';
import type { FormSubmissionData, FormSubmissionResponse } from '@/lib/forms';

export function useSubmitForm() {
  return useMutation<FormSubmissionResponse, Error, FormSubmissionData>({
    mutationFn: submitForm,
  });
}

export function useFormTypes() {
  return useQuery({
    queryKey: ['formTypes'],
    queryFn: getFormTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useContactForm() {
  const { data: formTypes } = useFormTypes();
  const submitMutation = useSubmitForm();

  const submit = async (formData: {
    name: string;
    email: string;
    company?: string;
    message: string;
  }) => {
    const contactFormType = formTypes?.find((type: any) => type.name === 'contact');
    if (!contactFormType) {
      throw new Error('Contact form type not found');
    }

    const submissionData = prepareFormSubmission(contactFormType.id, formData);
    return submitMutation.mutateAsync(submissionData);
  };

  return {
    submit,
    isLoading: submitMutation.isPending,
    isSuccess: submitMutation.isSuccess,
    isError: submitMutation.isError,
    error: submitMutation.error,
    reset: submitMutation.reset,
  };
}

export function useAIAnalysisForm() {
  const { data: formTypes } = useFormTypes();
  const submitMutation = useSubmitForm();

  const submit = async (formData: {
    company: string;
    name: string;
    email: string;
    phone?: string;
    employees: string;
    challenges?: string;
    budget: string;
    timeline: string;
  }) => {
    const aiFormType = formTypes?.find((type: any) => type.name === 'ai_analysis');
    if (!aiFormType) {
      throw new Error('AI analysis form type not found');
    }

    const submissionData = prepareFormSubmission(aiFormType.id, formData);
    return submitMutation.mutateAsync(submissionData);
  };

  return {
    submit,
    isLoading: submitMutation.isPending,
    isSuccess: submitMutation.isSuccess,
    isError: submitMutation.isError,
    error: submitMutation.error,
    reset: submitMutation.reset,
  };
}