import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui';
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
              <div className="max-w-[1600px] mx-auto bg-white rounded-xl  h-full pb-4
            " style={{boxShadow:" 0px 1px 14px 0px #807B7B40"}}>
    <div className="space-y-6">
      <div className='border-t-radius-2xl   md:sticky top-0 z-10 border-b-1 border-gray-200 bg-white py-4 px-4 '>
        <div className='flex flex-wrap gap-4 items-center justify-between mb-4'>
      <h1 className="text-2xl font-bold text-gray-900">
        List of your Post & Event
      </h1>
      <Button variant="primary">
        <PlusCircle className="w-5 h-5" />
        Create a new post
      </Button>
</div>
      <PostFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <PostGrid posts={mockPosts} loading={false} />
    </div>
    </div>
  );
};
