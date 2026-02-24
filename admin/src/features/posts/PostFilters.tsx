import React, { useCallback, useMemo } from 'react';
import { FileText, Calendar, Users, Settings } from 'lucide-react';
import { Button, Dropdown } from '../../components/ui';
import type { FilterOptions } from '../../types';

interface PostFiltersProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
}

export const PostFilters = React.memo(({ filters, onFilterChange }: PostFiltersProps) => {
  void filters;
  const onGroupChange = useCallback(
  (value: string) => onFilterChange('group', value),
  [onFilterChange]
);

const onModeChange = useCallback(
  (value: string) => onFilterChange('mode', value),
  [onFilterChange]
);

const onDateChange = useCallback(
  (value: string) => onFilterChange('date', value),
  [onFilterChange]
);


const groupOptions = useMemo(
  () => ['All Groups', 'Basic Members', 'Premium Members', 'Diamond Members'],
  []
);

const modeOptions = useMemo(
  () => ['All Modes', 'Online', 'Offline', 'Hybrid'],
  []
);

const dateOptions = useMemo(
  () => ['All Dates', 'Today', 'This Week', 'This Month'],
  []
);

  
  return (
    <div className="flex flex-wrap items-center gap-3 mb-2">
      <Button variant="secondary" size="md">
        <FileText className="w-4 h-4" />
        Create Post
      </Button>

      <Button variant="secondary" size="md">
        <Calendar className="w-4 h-4" />
        Create New Event
      </Button>

      <Dropdown
        label="Select Group"
        icon={<Users className="w-4 h-4" />}
        options={groupOptions}
       onChange={onGroupChange}
      />

      <Dropdown
        label="Select Mode"
        icon={<Settings className="w-4 h-4" />}
        options={modeOptions}
        onChange={onModeChange}
      />

      <Dropdown
        label="Select Date"
        icon={<Calendar className="w-4 h-4" />}
        options={dateOptions}
       onChange={onDateChange} 
      />
    </div>
  );
});
