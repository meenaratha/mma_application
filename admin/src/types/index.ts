
export type MembershipTier = 'Basic Members' | 'Premium Members' | 'Diamond Members';

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  membershipTier: MembershipTier;
  type?: string;
  date?: string;
  ageLimit?: string;
  paid?: string;
}

export interface FilterOptions {
  group: string;
  mode: string;
  date: string;
}

export interface MenuItemType {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MenuItemType[];
}


// ─── Billing ──────────────────────────────────────────────────────────────────
export type BillingCycle = 'monthly' | 'yearly';

// ─── Feature ──────────────────────────────────────────────────────────────────
export type FeatureStatus = 'included' | 'excluded' | 'partial';

export interface PlanFeature {
  label: string;
  status: FeatureStatus;
}

// ─── Plan ─────────────────────────────────────────────────────────────────────
export type PlanId = 'free' | 'basic' | 'standard' | 'professional';

export interface PricingPlan {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  userLimit: string;
  isPopular: boolean;
  accentColor: string;
  description: string;
  features: PlanFeature[];
  ctaLabel: string;
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
export interface BillingToggleProps {
  billing: BillingCycle;
  onToggle: () => void;
  yearlyDiscount: number;
}

// ─── Plan Card ────────────────────────────────────────────────────────────────
export interface PlanCardProps {
  plan: PricingPlan;
  billing: BillingCycle;
  isSelected: boolean;
  onSelect: (id: PlanId) => void;
}

// ─── Feature Row ─────────────────────────────────────────────────────────────
export interface FeatureRowProps {
  feature: PlanFeature;
}

// ─── Header ──────────────────────────────────────────────────────────────────
export interface PageHeaderProps {
  onCreateNew: () => void;
}


// ─── Navigation ───────────────────────────────────────────────────────────────
export type SettingsSection =
  | 'general'
  | 'trainer'
  | 'sub-staff'
  | 'member'
  | 'attendance'
  | 'workout'
  | 'payment'
  | 'notification'
  | 'reports'
  | 'offers'
  | 'customization'
  | 'support';

export interface NavItem {
  id: SettingsSection;
  label: string;
  icon: string;
}

// ─── General Settings Form ────────────────────────────────────────────────────
export interface GeneralSettingsForm {
  gymName: string;
  branchName: string;
  dateOfOpened: string;
  address: string;
  state: string;
  city: string;
  pinCode: string;
  language: string;
  workingHours: string;
  eligibility: string;
  workingStaffCount: string;
  contactNumber: string;
  emailId: string;
  shortDescription: string;
  logo: File | null;
  password: string;
  confirmPassword: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────
export type FormErrors = Partial<Record<keyof GeneralSettingsForm, string>>;
export type TouchedFields = Partial<Record<keyof GeneralSettingsForm, boolean>>;

// ─── Field Definitions ────────────────────────────────────────────────────────
export type FieldType = 'text' | 'email' | 'password' | 'date' | 'tel' | 'select' | 'textarea' | 'file' | 'number';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: keyof GeneralSettingsForm;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  autoFocus?: boolean;
  required?: boolean;
  colSpan?: 1 | 2 | 3;
}