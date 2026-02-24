import { useState, useMemo, useCallback } from 'react';
import { MEMBERS_DATA } from '../data/dashboard';
import type { WorkoutCategory } from '../types';

export function useMembers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredMembers = useMemo(() => {
    return MEMBERS_DATA.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.registerId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'All' || member.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  return { members: filteredMembers, searchQuery, setSearchQuery, filterStatus, setFilterStatus };
}

export function useWorkoutFilter() {
  const [activeCategory, setActiveCategory] = useState<WorkoutCategory>('All workouts');

  const handleCategoryChange = useCallback((category: WorkoutCategory) => {
    setActiveCategory(category);
  }, []);

  return { activeCategory, handleCategoryChange };
}

export function useDashboardStats() {
  const totalMembers = MEMBERS_DATA.length;
  const basicMembers = MEMBERS_DATA.filter((m) => m.plan === 'Basic').length;
  const planMembers = MEMBERS_DATA.filter((m) => m.plan !== 'Basic').length;
  const totalEarnings = totalMembers * 2435;

  return { totalMembers, basicMembers, planMembers, totalEarnings };
}