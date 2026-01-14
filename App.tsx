
import React, { useState, useEffect } from 'react';
import WeekCard from './components/WeekCard.tsx';
import { getISOWeekNumber, getTimezoneString } from './utils/dateUtils.ts';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [detectedTimezone, setDetectedTimezone] = useState<string>('');

  useEffect(() => {
    // Update current date every minute to keep it fresh
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    setDetectedTimezone(getTimezoneString());

    return () => clearInterval(timer);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(e.target.value);
  };

  const parsedTargetDate = new Date(targetDate);
  // Check if parsed date is valid
  const isValidTarget = !isNaN(parsedTargetDate.getTime());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      {/* Background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-12 md:py-24">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide uppercase text-slate-300">Week Number Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            精准日期周数<span className="gradient-text">计算器</span>
          </h1>
        </header>

        <div className="space-y-8">
          {/* 1. 当前时刻 */}
          <section>
            <WeekCard
              title="当前时刻"
              date={currentDate}
              weekNumber={getISOWeekNumber(currentDate)}
              isCurrent={true}
              timezone={detectedTimezone}
            />
          </section>

          {/* 2. 选择目标日期 */}
          <section>
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl">
              <div className="space-y-4">
                <label htmlFor="target-date" className="block text-sm font-semibold text-slate-300">
                  选择目标日期
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    id="target-date"
                    value={targetDate}
                    onChange={handleDateChange}
                    className="w-full bg-slate-900/50 border border-slate-700 text-white text-xl rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block p-4 outline-none transition-all group-hover:border-slate-500"
                  />
                </div>
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center text-slate-400 text-xs mb-1">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>计算标准: ISO-8601 (周一为起始日)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 指定日期结果 */}
          <section>
            <WeekCard
              title="指定日期"
              date={isValidTarget ? parsedTargetDate : new Date()}
              weekNumber={isValidTarget ? getISOWeekNumber(parsedTargetDate) : 0}
              isCurrent={false}
            />
          </section>
        </div>

        {/* Footer info */}
        <footer className="mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} WeekWise — 高级前端周数分析工具</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
