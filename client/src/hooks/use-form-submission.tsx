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
  const { data: formTypes, isLoading: isLoadingFormTypes } = useFormTypes();
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
    isLoadingFormTypes,
    isSuccess: submitMutation.isSuccess,
    isError: submitMutation.isError,
    error: submitMutation.error,
    reset: submitMutation.reset,
  };
}

export function useVSLForm() {
  const { data: formTypes, isLoading: isLoadingFormTypes } = useFormTypes();
  const submitMutation = useSubmitForm();

  const submit = async (formData: {
    email: string;
  }) => {
    const vslFormType = formTypes?.find((type: any) => type.name === 'vsl-lead');
    if (!vslFormType) {
      throw new Error('VSL form type not found');
    }

    const submissionData = prepareFormSubmission(vslFormType.id, formData);
    return submitMutation.mutateAsync(submissionData);
  };

  return {
    submit,
    isLoading: submitMutation.isPending,
    isLoadingFormTypes,
    isSuccess: submitMutation.isSuccess,
    isError: submitMutation.isError,
    error: submitMutation.error,
    reset: submitMutation.reset,
  };
}

export function useApplicationForm() {
  const { data: formTypes, isLoading: isLoadingFormTypes } = useFormTypes();
  const submitMutation = useSubmitForm();

  const submit = async (formData: {
    companyName: string;
    industry: string;
    companySize: string;
    website?: string;
    annualRevenue: string;
    currentChallenges: string;
    businessGoals: string;
    aiInterest: string;
    timeline: string;
    fullName: string;
    email: string;
    phone: string;
    preferredContact: string;
  }) => {
    const applicationFormType = formTypes?.find((type: any) => type.name === 'application');
    if (!applicationFormType) {
      throw new Error('Application form type not found');
    }

    const submissionData = prepareFormSubmission(applicationFormType.id, formData);
    return submitMutation.mutateAsync(submissionData);
  };

  return {
    submit,
    isLoading: submitMutation.isPending,
    isLoadingFormTypes,
    isSuccess: submitMutation.isSuccess,
    isError: submitMutation.isError,
    error: submitMutation.error,
    reset: submitMutation.reset,
  };
}

export function useAIAnalysisForm() {
  const { data: formTypes, isLoading: isLoadingFormTypes } = useFormTypes();
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
    isLoadingFormTypes,
    isSuccess: submitMutation.isSuccess,
    isError: submitMutation.isError,
    error: submitMutation.error,
    reset: submitMutation.reset,
  };
}