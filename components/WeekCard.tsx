
import React from 'react';
import { formatDate, getDayName } from '../utils/dateUtils.ts';

interface WeekCardProps {
  title: string;
  date: Date;
  weekNumber: number;
  isCurrent?: boolean;
  timezone?: string;
}

const WeekCard: React.FC<WeekCardProps> = ({ title, date, weekNumber, isCurrent, timezone }) => {
  return (
    <div className={`glass rounded-3xl p-8 transition-all duration-500 hover:translate-y-[-4px] ${isCurrent ? 'ring-1 ring-blue-500/30' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{title}</h3>
          <p className="text-2xl font-bold text-white leading-tight">{formatDate(date)}</p>
          <p className="text-blue-400/80 font-medium mt-1">{getDayName(date)}</p>
        </div>
        {isCurrent && (
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Live</span>
          </div>
        )}
      </div>

      <div className="relative py-4">
        <div className="flex items-baseline">
          <span className="text-slate-500 font-medium mr-3">第</span>
          <span className="text-7xl font-black gradient-text tracking-tighter">
            {String(weekNumber).padStart(2, '0')}
          </span>
          <span className="text-slate-500 font-medium ml-3">周</span>
        </div>
      </div>

      {!isCurrent && (
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center text-xs text-slate-500">
          <svg className="w-4 h-4 mr-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          自定义查询
        </div>
      )}
      
      {isCurrent && timezone && (
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center text-xs text-slate-500">
          <svg className="w-4 h-4 mr-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          设备同步时间
        </div>
      )}
    </div>
  );
};

export default WeekCard;
