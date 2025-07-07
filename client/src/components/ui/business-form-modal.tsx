import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Checkbox } from './checkbox';
import { X } from 'lucide-react';

interface BusinessFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  businessName: string;
  website: string;
  phoneNumber: string;
  email: string;
  employees: string;
  revenue: string;
  consultAcknowledge: boolean;
  privacyAcknowledge: boolean;
}

const employeeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' }
];

const revenueOptions = [
  { value: '0-100k', label: '€0 - €100k' },
  { value: '100k-500k', label: '€100k - €500k' },
  { value: '500k-1m', label: '€500k - €1M' },
  { value: '1m-5m', label: '€1M - €5M' },
  { value: '5m-10m', label: '€5M - €10M' },
  { value: '10m+', label: '€10M+' }
];

export function BusinessFormModal({ isOpen, onClose }: BusinessFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    website: '',
    phoneNumber: '',
    email: '',
    employees: '',
    revenue: '',
    consultAcknowledge: false,
    privacyAcknowledge: false
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.employees) newErrors.employees = 'Please select number of employees';
    if (!formData.revenue) newErrors.revenue = 'Please select revenue range';
    if (!formData.consultAcknowledge) newErrors.consultAcknowledge = 'Please acknowledge consultation cost';
    if (!formData.privacyAcknowledge) newErrors.privacyAcknowledge = 'Please accept privacy policy and terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
      alert('Thank you! We will contact you within 24 hours.');
      onClose();
      // Reset form
      setFormData({
        name: '',
        businessName: '',
        website: '',
        phoneNumber: '',
        email: '',
        employees: '',
        revenue: '',
        consultAcknowledge: false,
        privacyAcknowledge: false
      });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Get Personalized AI Advice</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={errors.phoneNumber ? 'border-red-500' : ''}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
            
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className={errors.businessName ? 'border-red-500' : ''}
                placeholder="Enter your business name"
              />
              {errors.businessName && <p className="text-sm text-red-500 mt-1">{errors.businessName}</p>}
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://your-website.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employees">Number of Employees *</Label>
                <Select
                  value={formData.employees}
                  onValueChange={(value) => handleInputChange('employees', value)}
                >
                  <SelectTrigger className={errors.employees ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select employee count" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employees && <p className="text-sm text-red-500 mt-1">{errors.employees}</p>}
              </div>

              <div>
                <Label htmlFor="revenue">Annual Revenue *</Label>
                <Select
                  value={formData.revenue}
                  onValueChange={(value) => handleInputChange('revenue', value)}
                >
                  <SelectTrigger className={errors.revenue ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    {revenueOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.revenue && <p className="text-sm text-red-500 mt-1">{errors.revenue}</p>}
              </div>
            </div>
          </div>

          {/* Acknowledgments */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Acknowledgments</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consultAcknowledge"
                  checked={formData.consultAcknowledge}
                  onCheckedChange={(checked) => handleInputChange('consultAcknowledge', checked as boolean)}
                  className={errors.consultAcknowledge ? 'border-red-500' : ''}
                />
                <Label htmlFor="consultAcknowledge" className="text-sm leading-6">
                  I acknowledge that the consultation costs €600 excluding VAT and understand the terms of service.
                </Label>
              </div>
              {errors.consultAcknowledge && <p className="text-sm text-red-500 ml-6">{errors.consultAcknowledge}</p>}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacyAcknowledge"
                  checked={formData.privacyAcknowledge}
                  onCheckedChange={(checked) => handleInputChange('privacyAcknowledge', checked as boolean)}
                  className={errors.privacyAcknowledge ? 'border-red-500' : ''}
                />
                <Label htmlFor="privacyAcknowledge" className="text-sm leading-6">
                  I have read and agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>.
                </Label>
              </div>
              {errors.privacyAcknowledge && <p className="text-sm text-red-500 ml-6">{errors.privacyAcknowledge}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}