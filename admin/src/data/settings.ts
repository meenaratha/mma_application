import type { FormField, NavItem } from "../types";

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'general',       label: 'General Settings',             icon: 'settings' },
  { id: 'trainer',       label: 'Trainer Settings',             icon: 'fitness_center' },
  { id: 'sub-staff',     label: 'Create A Sub - Staff',         icon: 'person_add' },
  { id: 'member',        label: 'Member Settings',              icon: 'group' },
  { id: 'attendance',    label: 'Attendance & Access Control',  icon: 'fingerprint' },
  { id: 'workout',       label: 'Workout Settings',             icon: 'sports_gymnastics' },
  { id: 'payment',       label: 'Payment & Billing Settings',   icon: 'credit_card' },
  { id: 'notification',  label: 'Notification & Communication', icon: 'notifications' },
  { id: 'reports',       label: 'Reports & Analytics Settings', icon: 'analytics' },
  { id: 'offers',        label: 'Offers & Promotions',          icon: 'local_offer' },
  { id: 'customization', label: 'Customization Settings',       icon: 'tune' },
  { id: 'support',       label: 'Support & Help',               icon: 'help_outline' },
] as const;

export const STATES = [
  { value: 'AN', label: 'Andaman & Nicobar' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'CG', label: 'Chhattisgarh' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu & Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TG', label: 'Telangana' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'WB', label: 'West Bengal' },
];

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'kn', label: 'Kannada' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'mr', label: 'Marathi' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'bn', label: 'Bengali' },
];

export const WORKING_HOURS = [
  { value: '6-10', label: '6:00 AM – 10:00 PM' },
  { value: '5-11', label: '5:00 AM – 11:00 PM' },
  { value: '24',   label: '24 Hours' },
  { value: '6-9',  label: '6:00 AM – 9:00 PM' },
  { value: '7-10', label: '7:00 AM – 10:00 PM' },
];

export const ELIGIBILITY_OPTIONS = [
  { value: 'all',   label: 'All Ages' },
  { value: '16+',   label: '16+ Years' },
  { value: '18+',   label: '18+ Years' },
  { value: '12-60', label: '12 – 60 Years' },
];

export const STAFF_COUNT_OPTIONS = [
  { value: '1-5',   label: '1 – 5' },
  { value: '6-10',  label: '6 – 10' },
  { value: '11-20', label: '11 – 20' },
  { value: '21-50', label: '21 – 50' },
  { value: '50+',   label: '50+' },
];

/** Field layout definition for General Settings form */
export const GENERAL_FIELDS: readonly FormField[] = [
  {
    name: 'gymName',      label: 'Gym Name',      type: 'text',
    placeholder: 'Gym Name',  required: true, autoFocus: true,
  },
  {
    name: 'branchName',   label: 'Branch Name',   type: 'text',
    placeholder: 'Branch Name', required: true,
  },
  {
    name: 'dateOfOpened', label: 'Date Of Opened', type: 'date',
    required: true,
  },
  {
    name: 'address',      label: 'Address',        type: 'text',
    placeholder: 'Address', colSpan: 3,
  },
  {
    name: 'state',        label: 'State',          type: 'select',
    options: STATES,
  },
  {
    name: 'city',         label: 'City',           type: 'select',
    options: [], // populated dynamically
  },
  {
    name: 'pinCode',      label: 'Enter Pin code', type: 'number',
    placeholder: 'Enter Pin code',
  },
  {
    name: 'language',     label: 'Select Language', type: 'select',
    options: LANGUAGES,
  },
  {
    name: 'workingHours', label: 'Working Hours',  type: 'select',
    options: WORKING_HOURS,
  },
  {
    name: 'eligibility',  label: 'Eligibility',    type: 'select',
    options: ELIGIBILITY_OPTIONS,
  },
  {
    name: 'workingStaffCount', label: 'Working Staff Count', type: 'select',
    options: STAFF_COUNT_OPTIONS,
  },
  {
    name: 'contactNumber',label: 'Contact Number', type: 'tel',
    placeholder: 'Contact Number', required: true,
  },
  {
    name: 'emailId',      label: 'Email Id',       type: 'email',
    placeholder: 'Email Id', required: true,
  },
  {
    name: 'shortDescription', label: 'Short Description', type: 'textarea',
    placeholder: 'Short Description', colSpan: 3,
  },
  {
    name: 'password',     label: 'Enter Password', type: 'password',
    placeholder: 'Enter Password', required: true,
  },
  {
    name: 'confirmPassword', label: 'Confirm Password', type: 'password',
    placeholder: 'Confirm Password', required: true,
  },
] as const;