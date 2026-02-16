import type { MenuItemType } from "../types";

export const MAIN_MENU_ITEMS: MenuItemType[] = [
  {
    id: 'explore',
    label: 'Explore by Goal',
    children: [
      { id: 'learn-ai', label: 'Learn AI' },
      { id: 'launch-career', label: 'Launch a new career' },
      { id: 'prepare-cert', label: 'Prepare for a certification' },
      { id: 'role-play', label: 'Practice with Role Play' },
    ]
  },
  {
    id: 'popular',
    label: 'Most popular',
    children: [
      { id: 'web-dev', label: 'Web Development' },
      { id: 'mobile-dev', label: 'Mobile Development' },
      { id: 'game-dev', label: 'Game Development' },
      { id: 'entrepreneurship', label: 'Entrepreneurship' },
      { id: 'business-analytics', label: 'Business Analytics & Intelligence' },
      { id: 'finance', label: 'Finance' },
    ]
  }
];

export const AUTH_MENU_ITEMS: MenuItemType[] = [
  { id: 'login', label: 'Log in' },
  { id: 'signup', label: 'Sign up' },
  { id: 'subscribe', label: 'Subscribe' },
];