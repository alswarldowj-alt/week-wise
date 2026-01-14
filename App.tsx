
import React, { useState, useEffect } from 'react';
import WeekCard from './components/WeekCard.tsx';
import { getISOWeekNumber, getTimezoneString } from './utils/dateUtils.ts';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [targetDateStr, setTargetDateStr] = useState<string>(new Date().toISOString().split('T')[0]);
  const [timezone, setTimezone] = useState<string>('');

  useEffect(() => {
    setTimezone(getTimezoneString());
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDateStr(e.target.value);
  };

  const targetDate = new Date(targetDateStr);
  const isTargetValid = !isNaN(targetDate.getTime());

  return (
    <div className="min-h-screen relative py-12 px-4 md:px-8">
      {/* 装饰性背景 */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Week<span className="gradient-text">Wise</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium">
            精准周数计算工具 · ISO-8601 标准
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* 左侧：输入与控制 */}
          <div className="space-y-8">
            <section className="glass rounded-3xl p-8 glow-blue">
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">设置目标日期</h2>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="date"
                    value={targetDateStr}
                    onChange={handleDateChange}
                    className="w-full bg-slate-900/80 border border-slate-700 text-white text-2xl rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>正在使用时区: {timezone}</span>
                </div>
              </div>
            </section>

            <section className="glass rounded-3xl p-6 text-slate-400 text-sm leading-relaxed">
              <h3 className="text-white font-semibold mb-2">关于 ISO-8601 标准</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>每周从 <span className="text-blue-400">星期一</span> 开始</li>
                <li>一年中的第 1 周是包含该年第一个星期四的那一周</li>
                <li>广泛应用于财务、制造和物流领域</li>
              </ul>
            </section>
          </div>

          {/* 右侧：结果展示 */}
          <div className="space-y-8">
            <WeekCard
              title="当前日期"
              date={currentDate}
              weekNumber={getISOWeekNumber(currentDate)}
              isCurrent={true}
              timezone={timezone}
            />

            <WeekCard
              title="目标日期结果"
              date={isTargetValid ? targetDate : new Date()}
              weekNumber={isTargetValid ? getISOWeekNumber(targetDate) : 0}
              isCurrent={false}
            />
          </div>
        </div>

        <footer className="mt-20 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} WeekWise — 精准掌控每一周</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
