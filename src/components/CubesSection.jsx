import React, { useState } from 'react';
import NumberGrid from '../components/NumberGrid';
import { getCube, getCubeTrick, getCubePattern, isPrime } from '../utils/mathUtils';

const ALL_NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

export default function CubesSection() {
  const [selected, setSelected] = useState(null);

  const cube = selected ? getCube(selected) : null;
  const tricks = selected ? getCubeTrick(selected) : null;
  const patterns = selected ? getCubePattern(selected) : null;

  function colorFn(n) {
    const isSelected = n === selected;
    if (isSelected) return { bg: 'bg-violet-500', text: 'text-white', ring: 'ring-violet-500' };
    if (n <= 10) return {
      bg: 'bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50',
      text: 'text-amber-700 dark:text-amber-300',
      ring: 'ring-amber-400/50',
    };
    return {
      bg: 'bg-ink-100 dark:bg-ink-800 hover:bg-violet-100 dark:hover:bg-violet-900/30',
      text: 'text-ink-700 dark:text-ink-200',
      ring: 'ring-violet-400/50',
    };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 text-xs text-ink-400 dark:text-ink-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-900/30" />1–10 (Must Know)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ink-200 dark:bg-ink-700" />11–20</span>
      </div>

      <div className="animate-fade-in">
        <NumberGrid
          numbers={ALL_NUMBERS}
          selected={selected}
          onSelect={setSelected}
          colorFn={colorFn}
        />
      </div>

      {/* All cubes quick reference */}
      <div className="rounded-xl border border-ink-100 dark:border-ink-800 overflow-hidden">
        <div className="px-4 py-2.5 bg-ink-50 dark:bg-ink-800/50 border-b border-ink-100 dark:border-ink-800">
          <p className="text-xs font-display font-semibold text-ink-500 dark:text-ink-400">Quick Reference — Cubes 1 to 20</p>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {ALL_NUMBERS.map(n => (
            <button
              key={n}
              onClick={() => setSelected(n === selected ? null : n)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                n === selected
                  ? 'bg-violet-500 text-white'
                  : 'bg-ink-50 dark:bg-ink-800/60 hover:bg-violet-50 dark:hover:bg-violet-900/20 text-ink-700 dark:text-ink-300'
              }`}
            >
              <span className={`font-mono text-xs ${n === selected ? 'text-violet-100' : 'text-ink-400 dark:text-ink-500'}`}>{n}³</span>
              <span className="font-display font-bold text-sm ml-2">{getCube(n)}</span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="animate-pop">
          <CubeDetail
            n={selected}
            cube={cube}
            tricks={tricks}
            patterns={patterns}
            onClose={() => setSelected(null)}
          />
        </div>
      )}
    </div>
  );
}

function CubeDetail({ n, cube, tricks, patterns, onClose }) {
  const [activeTab, setActiveTab] = useState('value');

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 dark:border-ink-800 bg-gradient-to-r from-violet-400/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-extrabold text-3xl text-gradient-violet">{n}</span>
            <span className="font-display font-bold text-sm text-ink-400 dark:text-ink-500 align-super">³</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ink-400 dark:text-ink-500">=</span>
            <span className="font-mono font-bold text-2xl text-ink-900 dark:text-ink-100">{cube}</span>
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
            className={`flex-1 px-3 py-2 text-xs font-display font-semibold rounded-t-lg transition-all ${
              activeTab === tab
                ? 'bg-white dark:bg-ink-900 text-ink-900 dark:text-ink-100'
                : 'text-ink-500 hover:text-ink-700 dark:hover:text-ink-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {activeTab === 'value' && (
          <div className="flex flex-wrap gap-4 items-start">
            <div className="text-center p-6 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50 min-w-[120px]">
              <p className="text-ink-400 dark:text-ink-500 text-xs mb-1 font-display">{n}³</p>
              <p className="font-display font-extrabold text-4xl text-violet-600 dark:text-violet-400">{cube}</p>
            </div>
            <div className="flex-1 min-w-[180px] space-y-2 pt-2">
              <InfoRow label="∛" value={n} desc="Cube root" />
              <InfoRow label="= n × n²" value={`${n} × ${n*n}`} desc={`= ${cube}`} />
              <InfoRow label="Last digit" value={cube % 10} desc="" />
              <InfoRow label="Digits" value={String(cube).length} desc="digit count" />
              {n > 1 && <InfoRow label="n³ – (n–1)³" value={cube - (n-1)**3} desc="increment" />}
            </div>
          </div>
        )}

        {activeTab === 'tricks' && (
          <div className="space-y-3">
            {tricks.map((t, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl bg-ink-50 dark:bg-ink-800/50 border-l-4 border border-ink-100 dark:border-ink-700/50 animate-slide-in ${['border-l-violet-400','border-l-amber-400','border-l-emerald-400','border-l-sky-400'][i % 4]}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <p className="font-display font-semibold text-sm text-ink-900 dark:text-ink-100 mb-1">{t.title}</p>
                <p className="text-ink-500 dark:text-ink-400 text-sm font-mono leading-relaxed">{t.desc}</p>
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
      {desc && <span className="text-ink-400 dark:text-ink-600 text-xs">({desc})</span>}
    </div>
  );
}
