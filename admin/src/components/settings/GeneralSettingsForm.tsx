import { memo, useState, useCallback, type ChangeEvent } from 'react';
import { useSettingsForm } from '../../hooks/useSettingsForm';
import styles from './GeneralSettingsForm.module.css';
import FormField from './FormField';

// ─── Password Strength ────────────────────────────────────────────────────────
function getStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/\d/.test(pw))           s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

// ─── Upload Zone ──────────────────────────────────────────────────────────────
interface UploadZoneProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const UploadZone = memo<UploadZoneProps>(({ onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDrag, setIsDrag] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
  }, []);

  return (
    <div
      className={`${styles.uploadZone} ${isDrag ? styles.drag : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDrag(true); }}
      onDragLeave={() => setIsDrag(false)}
      onDrop={(e) => {
        e.preventDefault(); setIsDrag(false);
        const f = e.dataTransfer.files[0];
        if (f) { handleFile(f); }
      }}
      onClick={() => document.getElementById('logoFile')?.click()}
      role="button" tabIndex={0} aria-label="Upload logo"
      onKeyDown={(e) => { if (e.key === 'Enter') document.getElementById('logoFile')?.click(); }}
    >
      <input
        id="logoFile" type="file" accept="image/*" style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); onChange(e); }}
      />
      {preview
        ? <img src={preview} alt="Logo preview" className={styles.uploadPreview} />
        : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      }
      <span className={styles.uploadText}>{preview ? 'Change Logo' : 'Upload Logo'}</span>
      {!preview && <span className={styles.uploadHint}>PNG, JPG, SVG up to 2MB</span>}
    </div>
  );
});
UploadZone.displayName = 'UploadZone';

// ─── Main Form ────────────────────────────────────────────────────────────────
const GeneralSettingsForm = memo(() => {
  const {
    values, touched, isSubmitting, isSubmitted,
    register, registerFile, getFieldError, handleSubmit, reset,
  } = useSettingsForm();

  const [showPw, setShowPw]     = useState(false);
  const [showCPw, setShowCPw]   = useState(false);
  const pwStrength = getStrength(values.password);

  const onSubmitValid = useCallback(async (_data: typeof values) => {
    await new Promise((r) => setTimeout(r, 1400));
    // dispatch to API here
  }, []);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmitValid)}
      noValidate
      aria-label="General Settings form"
    >
      {/* Success banner */}
      {isSubmitted && (
        <div className={styles.successBanner} role="status">
          ✓ Settings saved successfully!
        </div>
      )}

      {/* ── Row 1: Gym Name | Branch Name | Date Of Opened ── */}
      <div className={styles.grid3}>
        <FormField
          as="input" type="text" id="gymName" placeholder="Gym Name"
          autoFocus autoComplete="organization"
          {...register('gymName')}
          error={getFieldError('gymName')}
          touched={touched.gymName}
        />
        <FormField
          as="input" type="text" id="branchName" placeholder="Branch Name"
          {...register('branchName')}
          error={getFieldError('branchName')}
          touched={touched.branchName}
        />
        <FormField
          as="input" type="date" id="dateOfOpened"
          {...register('dateOfOpened')}
          error={getFieldError('dateOfOpened')}
          touched={touched.dateOfOpened}
        />
      </div>

      {/* ── Row 2: Address ── */}
      <div className={styles.grid1}>
        <FormField
          as="input" type="text" id="address" placeholder="Address"
          autoComplete="street-address"
          {...register('address')}
        />
      </div>

      {/* ── Row 3: State | City | Pin Code ── */}
      <div className={styles.grid3}>
        <FormField
          as="select" id="state" placeholder="State"
          options={[
            { value: 'MH', label: 'Maharashtra' },
            { value: 'KA', label: 'Karnataka' },
            { value: 'TN', label: 'Tamil Nadu' },
            { value: 'DL', label: 'Delhi' },
            { value: 'GJ', label: 'Gujarat' },
          ]}
          {...register('state')}
        />
        <FormField
          as="select" id="city" placeholder="City"
          options={[]}
          {...register('city')}
        />
        <FormField
          as="input" type="number" id="pinCode" placeholder="Enter Pin code"
          {...register('pinCode')}
          error={getFieldError('pinCode')}
          touched={touched.pinCode}
        />
      </div>

      {/* ── Row 4: Language | Working Hours | Eligibility ── */}
      <div className={styles.grid3}>
        <FormField
          as="select" id="language" placeholder="Select Language"
          options={[
            { value: 'en', label: 'English' }, { value: 'hi', label: 'Hindi' },
            { value: 'ta', label: 'Tamil' },   { value: 'te', label: 'Telugu' },
          ]}
          {...register('language')}
        />
        <FormField
          as="select" id="workingHours" placeholder="Working Hours"
          options={[
            { value: '6-22', label: '6:00 AM – 10:00 PM' },
            { value: '24',   label: '24 Hours' },
          ]}
          {...register('workingHours')}
        />
        <FormField
          as="select" id="eligibility" placeholder="Eligibility"
          options={[
            { value: 'all', label: 'All Ages' }, { value: '18+', label: '18+ Years' },
          ]}
          {...register('eligibility')}
        />
      </div>

      {/* ── Row 5: Staff Count | Contact | Email ── */}
      <div className={styles.grid3}>
        <FormField
          as="select" id="workingStaffCount" placeholder="Working Staff Count"
          options={[
            { value: '1-5', label: '1–5' }, { value: '6-10', label: '6–10' },
            { value: '11-20', label: '11–20' }, { value: '50+', label: '50+' },
          ]}
          {...register('workingStaffCount')}
        />
        <FormField
          as="input" type="tel" id="contactNumber" placeholder="Contact Number"
          {...register('contactNumber')}
          error={getFieldError('contactNumber')}
          touched={touched.contactNumber}
        />
        <FormField
          as="input" type="email" id="emailId" placeholder="Email Id"
          autoComplete="email"
          {...register('emailId')}
          error={getFieldError('emailId')}
          touched={touched.emailId}
        />
      </div>

      {/* ── Row 6: Short Description ── */}
      <div className={styles.grid1}>
        <FormField
          as="textarea" id="shortDescription" placeholder="Short Description"
          rows={3}
          {...register('shortDescription')}
        />
      </div>

      {/* ── Row 7: Upload Logo ── */}
      <div className={styles.grid1}>
        <UploadZone {...registerFile('logo')} />
      </div>

      {/* ── Row 8: Password | Confirm Password ── */}
      <div className={styles.grid3}>
        <div>
          <div className={styles.passWrap}>
            <FormField
              as="input" type={showPw ? 'text' : 'password'} id="password"
              placeholder="Enter Password" autoComplete="new-password"
              {...register('password')}
              error={getFieldError('password')}
              touched={touched.password}
            />
            <button
              type="button" className={styles.passToggle}
              onClick={() => setShowPw(p => !p)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? '🙈' : '👁'}
            </button>
          </div>
          {values.password && (
            <div className={styles.strengthWrap}>
              {[1,2,3,4].map(i => (
                <div
                  key={i}
                  className={styles.strengthBar}
                  style={{ background: i <= pwStrength ? STRENGTH_COLORS[pwStrength] : '#E5E7EB' }}
                />
              ))}
              <span className={styles.strengthLabel} style={{ color: STRENGTH_COLORS[pwStrength] }}>
                {STRENGTH_LABELS[pwStrength]}
              </span>
            </div>
          )}
        </div>

        <div className={styles.passWrap}>
          <FormField
            as="input" type={showCPw ? 'text' : 'password'} id="confirmPassword"
            placeholder="Confirm Password" autoComplete="new-password"
            {...register('confirmPassword')}
            error={getFieldError('confirmPassword')}
            touched={touched.confirmPassword}
          />
          <button
            type="button" className={styles.passToggle}
            onClick={() => setShowCPw(p => !p)}
            aria-label={showCPw ? 'Hide password' : 'Show password'}
          >
            {showCPw ? '🙈' : '👁'}
          </button>
        </div>

        <div />
      </div>

      {/* ── Save ── */}
      <div className={styles.footer}>
        <button type="reset" className={styles.btnReset} onClick={reset}>
          Reset
        </button>
        <button
          type="submit"
          className={`${styles.btnSave} ${isSubmitting ? styles.loading : ''}`}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
});

GeneralSettingsForm.displayName = 'GeneralSettingsForm';
export default GeneralSettingsForm;
