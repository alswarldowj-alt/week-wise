
import React from 'react';
import { formatDate, getDayName } from '../utils/dateUtils';

interface WeekCardProps {
  title: string;
  date: Date;
  weekNumber: number;
  isCurrent?: boolean;
  timezone?: string;
}

const WeekCard: React.FC<WeekCardProps> = ({ title, date, weekNumber, isCurrent, timezone }) => {
  return (
    <div className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${isCurrent ? 'ring-2 ring-blue-500/50 glow-blue' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
          <p className="text-xl font-bold text-white mt-1">{formatDate(date)}</p>
          <p className="text-slate-500 text-sm">{getDayName(date)}</p>
        </div>
        {isCurrent && (
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
            当前所在地
          </span>
        )}
      </div>

      <div className="flex items-baseline space-x-2 mt-6">
        <span className="text-sm text-slate-400">第</span>
        <span className="text-6xl font-black gradient-text tracking-tighter">{weekNumber}</span>
        <span className="text-sm text-slate-400">周</span>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center text-xs text-slate-500 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{timezone || '本地设备时间'}</span>
        </div>
      </div>
    </div>
  );
};

export default WeekCard;
