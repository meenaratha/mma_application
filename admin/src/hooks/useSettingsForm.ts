import {
  useState, useCallback, useRef, useMemo,
  type ChangeEvent, type FocusEvent,
} from 'react';
import type {
  GeneralSettingsForm,
  FormErrors,
  TouchedFields,
} from '../types';
import { validateGeneralSettings, validateField } from '../utils/validation';

// ─── Initial values ───────────────────────────────────────────────────────────
const INITIAL_VALUES: GeneralSettingsForm = {
  gymName: '',
  branchName: '',
  dateOfOpened: '',
  address: '',
  state: '',
  city: '',
  pinCode: '',
  language: '',
  workingHours: '',
  eligibility: '',
  workingStaffCount: '',
  contactNumber: '',
  emailId: '',
  shortDescription: '',
  logo: null,
  password: '',
  confirmPassword: '',
};

// ─── Return type ──────────────────────────────────────────────────────────────
export interface UseSettingsFormReturn {
  values: GeneralSettingsForm;
  errors: FormErrors;
  touched: TouchedFields;
  isSubmitting: boolean;
  isSubmitted: boolean;
  isDirty: boolean;
  firstErrorRef: React.RefObject<HTMLElement | null>;

  register: (name: keyof GeneralSettingsForm) => {
    name: keyof GeneralSettingsForm;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    ref: (el: HTMLElement | null) => void;
    'aria-invalid': boolean;
    'aria-describedby': string;
  };
  registerFile: (name: keyof GeneralSettingsForm) => {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  getFieldError: (name: keyof GeneralSettingsForm) => string;
  handleSubmit: (onValid: (data: GeneralSettingsForm) => void | Promise<void>) => (e: React.FormEvent) => void;
  reset: () => void;
  setValue: (name: keyof GeneralSettingsForm, value: string) => void;
}

/**
 * useSettingsForm — custom form state manager.
 *
 * Features:
 * - Per-field validation on blur (touched-based)
 * - Full form validation on submit
 * - Auto-focus on first error field after submit attempt
 * - Auto-focus on first field via autoFocus attr
 * - Dirty tracking
 * - isSubmitting loading state
 */
export function useSettingsForm(): UseSettingsFormReturn {
  const [values, setValues]       = useState<GeneralSettingsForm>(INITIAL_VALUES);
  const [errors, setErrors]       = useState<FormErrors>({});
  const [touched, setTouched]     = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted]   = useState(false);

  // Refs map: fieldName → DOM element
  const fieldRefs = useRef<Partial<Record<keyof GeneralSettingsForm, HTMLElement | null>>>({});
  const firstErrorRef = useRef<HTMLElement | null>(null);

  // Track dirty state
  const isDirty = useMemo(() =>
    JSON.stringify(values) !== JSON.stringify(INITIAL_VALUES),
    [values]
  );

  /**
   * register() — returns all props needed for a controlled input.
   * Equivalent to react-hook-form's register().
   */
  const register = useCallback((name: keyof GeneralSettingsForm) => {
    return {
      name,
      value: (values[name] as string) ?? '',

      onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const newVal = e.target.value;
        setValues(prev => ({ ...prev, [name]: newVal }));

        // Live validation only after field has been touched
        setTouched(prev => {
          if (!prev[name]) return prev;
          return prev;
        });
        if (touched[name]) {
          setErrors(prev => ({
            ...prev,
            [name]: validateField(name, newVal, { ...values, [name]: newVal }),
          }));
        }
        // Special case: re-validate confirmPassword when password changes
        if (name === 'password' && touched.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: values.confirmPassword !== newVal
              ? 'Passwords do not match'
              : '',
          }));
        }
      },

      onBlur(_e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setTouched(prev => ({ ...prev, [name]: true }));
        const err = validateField(name, (values[name] as string) ?? '', values);
        setErrors(prev => ({ ...prev, [name]: err }));
      },

      // Collects the DOM ref for autofocus-on-error
      ref(el: HTMLElement | null) {
        fieldRefs.current[name] = el;
      },

      'aria-invalid': !!(touched[name] && errors[name]),
      'aria-describedby': `${name}-error`,
    };
  }, [values, errors, touched]);

  /**
   * registerFile() — special handler for file inputs.
   */
  const registerFile = useCallback((name: keyof GeneralSettingsForm) => ({
    onChange(e: ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0] ?? null;
      setValues(prev => ({ ...prev, [name]: file }));
    },
  }), []);

  /**
   * getFieldError — returns error only if field has been touched.
   */
  const getFieldError = useCallback((name: keyof GeneralSettingsForm): string => {
    if (!touched[name]) return '';
    return errors[name] ?? '';
  }, [errors, touched]);

  /**
   * handleSubmit — validates all fields, focuses first error.
   */
  const handleSubmit = useCallback(
    (onValid: (data: GeneralSettingsForm) => void | Promise<void>) =>
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields touched
      const allTouched = Object.keys(INITIAL_VALUES).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as TouchedFields
      );
      setTouched(allTouched);

      const allErrors = validateGeneralSettings(values);
      setErrors(allErrors);

      const errorKeys = Object.keys(allErrors) as Array<keyof GeneralSettingsForm>;
      if (errorKeys.length > 0) {
        // Focus the first error field
        const firstKey = errorKeys[0];
        const el = fieldRefs.current[firstKey];
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrorRef.current = el;
        }
        return;
      }

      setIsSubmitting(true);
      try {
        await onValid(values);
        setIsSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values]
  );

  /**
   * setValue — programmatic field update (e.g. from dropdowns).
   */
  const setValue = useCallback((name: keyof GeneralSettingsForm, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  /**
   * reset — clears form back to initial state.
   */
  const reset = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    isDirty,
    firstErrorRef,
    register,
    registerFile,
    getFieldError,
    handleSubmit,
    reset,
    setValue,
  };
}
