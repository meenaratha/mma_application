import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { StatsData } from '../../types';

interface BarChartProps {
  data: StatsData[];
  height?: number;
  showEmojis?: boolean;
  className?: string;
  'aria-label'?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl">
        <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
        <p className="text-sm font-bold text-gray-800">
          {payload[0].value} <span className="text-xs font-normal text-gray-500">members</span>
        </p>
      </div>
    );
  }
  return null;
};

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  className = '',
  'aria-label': ariaLabel,
}) => {
  return (
    <div
      className={`w-full ${className}`}
      style={{ height }}
      aria-label={ariaLabel}
      role="graphics-document"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 }}
            dy={10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6', radius: 8 }} />
          <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={28} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;