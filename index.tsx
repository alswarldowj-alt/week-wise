
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- 工具函数: Date Utils ---
function getISOWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

function getDayName(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(date);
}

function getTimezoneString(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return 'Asia/Shanghai';
  }
}

// --- 组件: WeekCard ---
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
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">实时</span>
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

      <div className="mt-6 pt-6 border-t border-white/5 flex items-center text-xs text-slate-500">
        <svg className="w-4 h-4 mr-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {isCurrent && timezone ? `时区: ${timezone}` : 'ISO-8601 标准'}
      </div>
    </div>
  );
};

// --- 主应用: App ---
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
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">选择目标日期</h2>
              <div className="space-y-6">
                <input
                  type="date"
                  value={targetDateStr}
                  onChange={handleDateChange}
                  className="w-full bg-slate-900/80 border border-slate-700 text-white text-2xl rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                />
                <p className="text-slate-500 text-xs italic leading-relaxed">
                  选择任意日期，我们将为您计算其在当年度 ISO 标准下的周数。
                </p>
              </div>
            </section>

            <section className="glass rounded-3xl p-6 text-slate-400 text-sm leading-relaxed">
              <h3 className="text-white font-semibold mb-2">ISO-8601 标准说明</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>每周从 <span className="text-blue-400">星期一</span> 开始</li>
                <li>一年中的第 1 周是包含该年第一个星期四的那一周</li>
              </ul>
            </section>
          </div>

          {/* 右侧：结果展示 */}
          <div className="space-y-8">
            <WeekCard
              title="当前系统时间"
              date={currentDate}
              weekNumber={getISOWeekNumber(currentDate)}
              isCurrent={true}
              timezone={timezone}
            />

            <WeekCard
              title="目标日期查询"
              date={isTargetValid ? targetDate : new Date()}
              weekNumber={isTargetValid ? getISOWeekNumber(targetDate) : 0}
              isCurrent={false}
            />
          </div>
        </div>

        <footer className="mt-20 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} WeekWise — 让时间更精准</p>
        </footer>
      </div>
    </div>
  );
};

// --- 挂载应用 ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
