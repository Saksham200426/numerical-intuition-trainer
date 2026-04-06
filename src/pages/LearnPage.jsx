import React, { useState } from 'react';
import TablesSection from '../components/TablesSection';
import SquaresSection from '../components/SquaresSection';
import CubesSection from '../components/CubesSection';

const TABS = [
  { id: 'tables', label: 'Tables', sub: '1–100', icon: '×', accent: 'amber' },
  { id: 'squares', label: 'Squares', sub: '1–50', icon: '²', accent: 'emerald' },
  { id: 'cubes', label: 'Cubes', sub: '1–20', icon: '³', accent: 'violet' },
];

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState('tables');

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6 animate-slide-up">
          <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-ink-50 mb-1">Learn Mode</h2>
          <p className="text-ink-400 dark:text-ink-500 text-sm">Click any number to see its table, tricks, and patterns</p>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 mb-6 p-1 rounded-2xl bg-ink-100 dark:bg-ink-800 w-fit animate-slide-up" style={{ animationDelay: '0.05s' }}>
          {TABS.map(tab => {
            const active = activeTab === tab.id;
            const accentMap = {
              amber: active ? 'bg-white dark:bg-ink-900 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200',
              emerald: active ? 'bg-white dark:bg-ink-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200',
              violet: active ? 'bg-white dark:bg-ink-900 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200',
            };
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-display font-semibold transition-all duration-200 ${accentMap[tab.accent]}`}
              >
                <span className="font-mono font-bold text-lg leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${active ? 'bg-ink-100 dark:bg-ink-800' : 'bg-ink-200 dark:bg-ink-700'} font-mono`}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section Content */}
        <div className="animate-fade-in" key={activeTab}>
          {activeTab === 'tables' && <TablesSection />}
          {activeTab === 'squares' && <SquaresSection />}
          {activeTab === 'cubes' && <CubesSection />}
        </div>
      </div>
    </div>
  );
}
