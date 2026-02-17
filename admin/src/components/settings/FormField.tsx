import { memo, forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import styles from './FormField.module.css';

// ─── Input ────────────────────────────────────────────────────────────────────
interface BaseFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
}

type InputFieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & { as?: 'input'; name?: string | number | symbol };

type SelectFieldProps = BaseFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> & {
    as: 'select';
    options?: { value: string; label: string }[];
    placeholder?: string;
    name?: string | number | symbol;
  };

type TextareaFieldProps = BaseFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & { as: 'textarea'; name?: string | number | symbol };

type FormFieldProps = InputFieldProps | SelectFieldProps | TextareaFieldProps;

/**
 * FormField — unified reusable field component.
 * Handles input, select, textarea with consistent error/success states.
 * forwardRef allows parent (useSettingsForm) to grab DOM refs for autofocus.
 */
const FormField = memo(
  forwardRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, FormFieldProps>(
    (props, ref) => {
      const { label, error, touched, as = 'input', name, ...rest } = props;
      const fieldName = name?.toString();
      const showError = touched && !!error;
      const showSuccess = touched && !error && !!(rest as InputHTMLAttributes<HTMLInputElement>).value;

      const fieldClass = `${styles.field} ${showError ? styles.error : ''} ${showSuccess ? styles.success : ''}`;

      return (
        <div className={styles.wrapper}>
          {label && <label className={styles.label}>{label}</label>}

          {as === 'select' ? (
            <select
              {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
              name={fieldName}
              ref={ref as React.Ref<HTMLSelectElement>}
              className={`${fieldClass} ${styles.select}`}
              aria-invalid={showError}
              aria-describedby={rest.id ? `${rest.id}-error` : undefined}
            >
              {(rest as SelectFieldProps).placeholder && (
                <option value="">{(rest as SelectFieldProps).placeholder}</option>
              )}
              {(rest as SelectFieldProps).options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : as === 'textarea' ? (
            <textarea
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
              name={fieldName}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={`${fieldClass} ${styles.textarea}`}
              aria-invalid={showError}
              aria-describedby={rest.id ? `${rest.id}-error` : undefined}
            />
          ) : (
            <input
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
              name={fieldName}
              ref={ref as React.Ref<HTMLInputElement>}
              className={fieldClass}
              aria-invalid={showError}
              aria-describedby={rest.id ? `${rest.id}-error` : undefined}
            />
          )}

          {showError && (
            <p
              id={rest.id ? `${rest.id}-error` : undefined}
              className={styles.errorMsg}
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

FormField.displayName = 'FormField';
export default FormField;
