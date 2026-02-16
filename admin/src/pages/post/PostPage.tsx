import { useState } from 'react';
import { PostFilters, PostGrid } from '../../features/posts';
import type { FilterOptions } from '../../types';
import { mockPosts } from '../../utils/mockPosts';

export const PostPage = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    group: 'Select Group',
    mode: 'Select Mode',
    date: 'Select Date',
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        List of your Post & Event
      </h1>

      <PostFilters filters={filters} onFilterChange={handleFilterChange} />
      <PostGrid posts={mockPosts} />
    </div>
  );
};
