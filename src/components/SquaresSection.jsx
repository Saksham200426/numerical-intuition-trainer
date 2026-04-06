import React, { useState } from 'react';
import NumberGrid from '../components/NumberGrid';
import { getSquare, getSquareTrick, getSquarePattern, isPrime, isEven } from '../utils/mathUtils';

const ALL_NUMBERS = Array.from({ length: 50 }, (_, i) => i + 1);

export default function SquaresSection() {
  const [selected, setSelected] = useState(null);

  const sq = selected ? getSquare(selected) : null;
  const tricks = selected ? getSquareTrick(selected) : null;
  const patterns = selected ? getSquarePattern(selected) : null;

  function colorFn(n) {
    const isSelected = n === selected;
    if (isSelected) return { bg: 'bg-emerald-500', text: 'text-white', ring: 'ring-emerald-500' };
    if (n % 5 === 0) return {
      bg: 'bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50',
      text: 'text-amber-700 dark:text-amber-300',
      ring: 'ring-amber-400/50',
    };
    if (isPrime(n)) return {
      bg: 'bg-violet-100 dark:bg-violet-900/30 hover:bg-violet-200 dark:hover:bg-violet-900/50',
      text: 'text-violet-700 dark:text-violet-300',
      ring: 'ring-violet-400/50',
    };
    return {
      bg: 'bg-ink-100 dark:bg-ink-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/20',
      text: 'text-ink-700 dark:text-ink-300',
      ring: 'ring-emerald-400/50',
    };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 text-xs text-ink-400 dark:text-ink-500 flex-wrap">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-violet-200 dark:bg-violet-900/60" />Prime base</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-900/30" />Multiple of 5</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ink-200 dark:bg-ink-700" />Other</span>
      </div>

      <div className="animate-fade-in">
        <NumberGrid
          numbers={ALL_NUMBERS}
          selected={selected}
          onSelect={setSelected}
          colorFn={colorFn}
        />
      </div>

      {selected && (
        <div className="animate-pop">
          <SquareDetail
            n={selected}
            sq={sq}
            tricks={tricks}
            patterns={patterns}
            onClose={() => setSelected(null)}
          />
        </div>
      )}
    </div>
  );
}

function SquareDetail({ n, sq, tricks, patterns, onClose }) {
  const [activeTab, setActiveTab] = useState('value');

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 dark:border-ink-800 bg-gradient-to-r from-emerald-400/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-extrabold text-3xl text-gradient-emerald">{n}</span>
            <span className="font-display font-bold text-xl text-ink-400 dark:text-ink-500 align-super text-sm">²</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ink-400 dark:text-ink-500">=</span>
            <span className="font-mono font-bold text-2xl text-ink-900 dark:text-ink-100">{sq}</span>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 text-ink-400 text-lg transition-colors">✕</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-px bg-ink-100 dark:bg-ink-800 px-1 pt-1">
        {[['value', 'Value'], ['tricks', 'Tricks'], ['patterns', 'Patterns']].map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 text-xs font-display font-semibold rounded-t-lg transition-all duration-150 ${
              activeTab === tab
                ? 'bg-white dark:bg-ink-900 text-ink-900 dark:text-ink-100'
                : 'text-ink-500 dark:text-ink-500 hover:text-ink-700 dark:hover:text-ink-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {activeTab === 'value' && (
          <div className="space-y-4">
            {/* Big visual */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="text-center p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 min-w-[120px]">
                <p className="text-ink-400 dark:text-ink-500 text-xs mb-1 font-display">{n}²</p>
                <p className="font-display font-extrabold text-4xl text-emerald-600 dark:text-emerald-400">{sq}</p>
              </div>
              <div className="flex-1 min-w-[180px] space-y-2">
                <InfoRow label="√" value={n} desc="Square root" />
                <InfoRow label="n²–(n–1)²" value={2*n-1} desc={`= 2×${n}–1`} />
                <InfoRow label="Digit sum" value={getDigitalRoot(sq)} desc={`of ${sq}`} />
                <InfoRow label="Ends in" value={sq % 10} desc="last digit" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tricks' && (
          <div className="space-y-3">
            {tricks.map((t, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl bg-ink-50 dark:bg-ink-800/50 border-l-4 border border-ink-100 dark:border-ink-700/50 animate-slide-in ${['border-l-emerald-400','border-l-amber-400','border-l-violet-400','border-l-sky-400'][i % 4]}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <p className="font-display font-semibold text-sm text-ink-900 dark:text-ink-100 mb-1">{t.title}</p>
                <p className="text-ink-500 dark:text-ink-400 text-sm font-mono">{t.desc}</p>
              </div>
            ))}
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

function InfoRow({ label, value, desc }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-mono text-ink-400 dark:text-ink-500 w-24 shrink-0 text-xs">{label}</span>
      <span className="font-display font-bold text-ink-900 dark:text-ink-100">{value}</span>
      <span className="text-ink-400 dark:text-ink-600 text-xs">({desc})</span>
    </div>
  );
}

function getDigitalRoot(n) {
  if (n === 0) return 0;
  return 1 + (n - 1) % 9;
}
