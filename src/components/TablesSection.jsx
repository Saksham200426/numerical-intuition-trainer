import React, { useState, useMemo } from 'react';
import NumberGrid from '../components/NumberGrid';
import {
  getTableData, getTableTricks, getTablePatterns,
  isPrime, isComposite, isEven, isOdd, filterNumbers,
} from '../utils/mathUtils';

const ALL_NUMBERS = Array.from({ length: 100 }, (_, i) => i + 1);
const FILTERS = ['all', 'odd', 'even', 'prime', 'composite'];

export default function TablesSection() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let nums = filterNumbers(ALL_NUMBERS, filter);
    if (search.trim()) {
      const q = parseInt(search.trim());
      if (!isNaN(q)) nums = nums.filter(n => n === q);
    }
    return nums;
  }, [filter, search]);

  const tableData = selected ? getTableData(selected) : null;
  const tricks = selected ? getTableTricks(selected) : null;
  const patterns = selected ? getTablePatterns(selected) : null;

  function colorFn(n) {
    const isP = isPrime(n);
    const isC = isComposite(n);
    const isSelected = n === selected;

    if (isSelected) return { bg: 'bg-amber-500', text: 'text-white', ring: 'ring-amber-500' };
    if (isP) return {
      bg: 'bg-violet-100 dark:bg-violet-900/40 hover:bg-violet-200 dark:hover:bg-violet-900/60',
      text: 'text-violet-700 dark:text-violet-300',
      ring: 'ring-violet-400/50',
    };
    if (n % 2 === 0) return {
      bg: 'bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-900/40',
      text: 'text-sky-700 dark:text-sky-300',
      ring: 'ring-sky-400/50',
    };
    return {
      bg: 'bg-ink-100 dark:bg-ink-800 hover:bg-amber-100 dark:hover:bg-amber-900/30',
      text: 'text-ink-700 dark:text-ink-200',
      ring: 'ring-amber-400/50',
    };
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Filter pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold capitalize transition-all duration-150 ${
                filter === f
                  ? 'bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-950'
                  : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        {/* Search */}
        <div className="relative sm:ml-auto">
          <input
            type="number"
            min="1"
            max="100"
            placeholder="Jump to number…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-base w-44 bg-white dark:bg-ink-800 border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 placeholder-ink-400 dark:placeholder-ink-600 focus:ring-amber-400/40 dark:focus:ring-amber-400/30 focus:border-amber-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200"
            >✕</button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-ink-400 dark:text-ink-500">
        <LegendDot color="bg-violet-200 dark:bg-violet-900/60" label="Prime" />
        <LegendDot color="bg-sky-100 dark:bg-sky-900/40" label="Even composite" />
        <LegendDot color="bg-ink-200 dark:bg-ink-700" label="Odd composite" />
      </div>

      {/* Number Grid */}
      <div className="animate-fade-in">
        <NumberGrid
          numbers={filtered}
          selected={selected}
          onSelect={n => { setSelected(n); }}
          colorFn={colorFn}
        />
        {filtered.length === 0 && (
          <p className="text-ink-400 dark:text-ink-500 text-sm">No numbers match your filter.</p>
        )}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="animate-pop mt-2">
          <DetailPanel
            number={selected}
            tableData={tableData}
            tricks={tricks}
            patterns={patterns}
            onClose={() => setSelected(null)}
          />
        </div>
      )}
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded ${color}`} />
      {label}
    </span>
  );
}

function DetailPanel({ number, tableData, tricks, patterns, onClose }) {
  const [activeTab, setActiveTab] = useState('table');

  const tags = [];
  if (isPrime(number)) tags.push({ label: 'Prime', color: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300' });
  else if (isComposite(number)) tags.push({ label: 'Composite', color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' });
  if (isEven(number)) tags.push({ label: 'Even', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' });
  else tags.push({ label: 'Odd', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' });

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 dark:border-ink-800 bg-gradient-to-r from-amber-400/5 to-transparent">
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-3xl text-gradient-amber">{number}</span>
          <div className="flex gap-1.5">
            {tags.map(t => (
              <span key={t.label} className={`text-xs px-2 py-0.5 rounded-full font-display font-semibold ${t.color}`}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 text-ink-400 dark:text-ink-500 text-lg transition-colors">
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-px bg-ink-100 dark:bg-ink-800 px-1 pt-1">
        {['table', 'tricks', 'patterns'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 text-xs font-display font-semibold capitalize rounded-t-lg transition-all duration-150 ${
              activeTab === tab
                ? 'bg-white dark:bg-ink-900 text-ink-900 dark:text-ink-100'
                : 'text-ink-500 dark:text-ink-500 hover:text-ink-700 dark:hover:text-ink-300'
            }`}
          >
            {tab === 'table' ? `Table of ${number}` : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === 'table' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {tableData.map(({ multiplier, result }) => (
              <div
                key={multiplier}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-ink-50 dark:bg-ink-800/60 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
              >
                <span className="text-ink-400 dark:text-ink-500 font-mono text-xs">
                  {number}×{multiplier}
                </span>
                <span className="font-display font-bold text-ink-900 dark:text-ink-100 text-sm ml-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {result}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tricks' && (
          <div className="space-y-3">
            {tricks.length === 0 ? (
              <p className="text-ink-400 dark:text-ink-500 text-sm">No specific tricks — practice makes perfect for this number!</p>
            ) : (
              tricks.map((t, i) => (
                <TrickCard key={i} title={t.title} desc={t.desc} index={i} />
              ))
            )}
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {patterns.map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50 border border-ink-100 dark:border-ink-700/50">
                <p className="font-display font-semibold text-xs text-ink-900 dark:text-ink-100 mb-0.5">{p.label}</p>
                <p className="text-ink-500 dark:text-ink-400 text-xs">{p.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TrickCard({ title, desc, index }) {
  const colors = [
    'border-l-amber-400',
    'border-l-violet-400',
    'border-l-emerald-400',
    'border-l-sky-400',
    'border-l-rose-400',
  ];
  return (
    <div
      className={`p-4 rounded-xl bg-ink-50 dark:bg-ink-800/50 border border-ink-100 dark:border-ink-700/50 border-l-4 ${colors[index % colors.length]} animate-slide-in`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <p className="font-display font-semibold text-sm text-ink-900 dark:text-ink-100 mb-1">{title}</p>
      <p className="text-ink-500 dark:text-ink-400 text-sm font-mono leading-relaxed">{desc}</p>
    </div>
  );
}
