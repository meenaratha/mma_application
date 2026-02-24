import { memo } from 'react';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  onCreateNew: () => void;
}

const PageHeader = memo(({ onCreateNew }: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Choose the right plan for you
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Simple pricing. No hidden fees. Cancel anytime.
        </p>
      </div>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-all font-medium shadow-lg shadow-purple-200 active:scale-95"
      >
        <Plus className="w-5 h-5" />
        Create Custom Plan
      </button>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';

export default PageHeader;
