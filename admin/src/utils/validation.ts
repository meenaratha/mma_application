import type { GeneralSettingsForm, FormErrors } from '../types';

export const validateField = (
  name: keyof GeneralSettingsForm,
  value: any,
  values: GeneralSettingsForm
): string => {
  switch (name) {
    case 'gymName':
      if (!value) return 'Gym Name is required';
      break;
    case 'contactNumber':
      if (!value) return 'Contact Number is required';
      if (!/^\d{10}$/.test(value)) return 'Invalid contact number (10 digits)';
      break;
    case 'emailId':
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
      break;
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      break;
    case 'confirmPassword':
      if (!value) return 'Confirm Password is required';
      if (value !== values.password) return 'Passwords do not match';
      break;
    case 'pinCode':
      if (value && !/^\d{6}$/.test(value)) return 'Invalid Pin Code';
      break;
  }
  return '';
};

export const validateGeneralSettings = (values: GeneralSettingsForm): FormErrors => {
  const errors: FormErrors = {};
  (Object.keys(values) as Array<keyof GeneralSettingsForm>).forEach((key) => {
    const error = validateField(key, values[key], values);
    if (error) {
      errors[key] = error;
    }
  });
  return errors;
};