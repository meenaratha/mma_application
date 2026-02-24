import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  bgColor: string;
  textColor: string;
  icon: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(({
  title,
  value,
  subtitle,
  bgColor,
  textColor,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-2 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg ${bgColor} ${className}`}
      role="region"
      aria-label={title}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl" role="img" aria-label={title}>{icon}</span>
        <span className={`font-semibold text-sm ${textColor}`}>{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
        {subtitle && (
          <span className={`text-sm font-medium opacity-70 ${textColor}`}>({subtitle})</span>
        )}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;