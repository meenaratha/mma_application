import type { Member, StatsData, WorkoutTag } from '../types';

export const MEMBERS_DATA: Member[] = [
  { id: '1', name: 'Dakshnamoorthy', registerId: 'AMS2837HB', age: 22, plan: 'Basic', date: '11/01/26', status: 'Paid' },
  { id: '2', name: 'Selva Kumar', registerId: 'AMS2837HB', age: 22, plan: 'Basic', date: '11/01/26', status: 'Paid' },
  { id: '3', name: 'Priya Sharma', registerId: 'AMS4521KC', age: 28, plan: 'Premium', date: '11/01/26', status: 'Paid' },
  { id: '4', name: 'Arjun Nair', registerId: 'AMS9034LD', age: 35, plan: 'Elite', date: '10/01/26', status: 'Pending' },
  { id: '5', name: 'Kavitha Raj', registerId: 'AMS7712ME', age: 24, plan: 'Basic', date: '09/01/26', status: 'Paid' },
  { id: '6', name: 'Ramesh Babu', registerId: 'AMS3301NF', age: 42, plan: 'Premium', date: '08/01/26', status: 'Overdue' },
  { id: '7', name: 'Meena Sundaram', registerId: 'AMS6678OG', age: 31, plan: 'Basic', date: '07/01/26', status: 'Paid' },
];

export const CHART_DATA: StatsData[] = [
  { month: 'Jan', value: 65, color: '#93C5FD' },
  { month: 'Feb', value: 85, color: '#F9A8D4' },
  { month: 'Mar', value: 45, color: '#86EFAC' },
  { month: 'Apr', value: 72, color: '#FCD34D' },
  { month: 'May', value: 90, color: '#F9A8D4' },
  { month: 'Jun', value: 55, color: '#7DD3FC' },
  { month: 'July', value: 78, color: '#7DD3FC' },
  { month: 'Aug', value: 60, color: '#86EFAC' },
  { month: 'Sep', value: 82, color: '#FCA5A5' },
];

export const WORKOUT_TAGS: WorkoutTag[] = [
  { label: 'YOGA', icon: '🧘' },
  { label: 'Cycling', icon: '🚴' },
  { label: 'Running', icon: '🏃' },
  { label: 'Running', icon: '🏃' },
  { label: 'Cycling', icon: '🚴' },
  { label: 'Running', icon: '🏃' },
  { label: 'Cycling', icon: '🚴' },
  { label: 'YOGA', icon: '🧘' },
  { label: 'Cycling', icon: '🚴' },
  { label: 'YOGA', icon: '🧘' },
  { label: 'Running', icon: '🏃' },
  { label: 'YOGA', icon: '🧘' },
];

export const WORKOUT_CATEGORIES = ['All workouts', 'Weight gain', 'Weight loss', 'Healthy Body'] as const;