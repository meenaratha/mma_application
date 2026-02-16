
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