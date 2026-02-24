import React from 'react';
import { Chip, Avatar } from '@mui/material';
import type { WorkoutCategory } from '../../types';
import { WORKOUT_CATEGORIES, WORKOUT_TAGS } from '../../data/dashboard';

interface WorkoutPanelProps {
  activeCategory: WorkoutCategory;
  onCategoryChange: (category: WorkoutCategory) => void;
  className?: string;
}

const WorkoutPanel: React.FC<WorkoutPanelProps> = React.memo(({
  activeCategory,
  onCategoryChange,
  className = '',
}) => {
  return (
    <div className={`bg-amber-50 rounded-2xl p-5 flex flex-col gap-4 ${className}`}>
      <h2 className="text-lg font-bold text-amber-700">Favourited Workout</h2>

      {/* Category Tabs */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide border-b border-amber-100 pb-3">
        {WORKOUT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat as WorkoutCategory)}
            className={`text-sm font-medium whitespace-nowrap pb-1 transition-all ${
              activeCategory === cat
                ? 'text-purple-600 border-b-2 border-purple-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Workout Tags Grid - Scrollable */}
      <div
        className="flex flex-wrap gap-2 overflow-y-auto max-h-44 pr-1 scrollbar-thin scrollbar-thumb-amber-200"
        role="list"
        aria-label="Workout options"
      >
        {WORKOUT_TAGS.map((tag, i) => (
          <Chip
            key={`${tag.label}-${i}`}
            avatar={<Avatar sx={{ bgcolor: 'transparent' }}>{tag.icon}</Avatar>}
            label={tag.label}
            variant="outlined"
            clickable
            sx={{
              bgcolor: 'white',
              borderColor: 'grey.200',
              boxShadow: 1,
              fontWeight: 500,
              '&:hover': { boxShadow: 2, transform: 'scale(1.02)' },
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
});

WorkoutPanel.displayName = 'WorkoutPanel';

export default WorkoutPanel;