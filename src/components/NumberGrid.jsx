import React from 'react';

export default function NumberGrid({ numbers, selected, onSelect, colorFn }) {
  return (
    <div className="flex flex-wrap gap-2">
      {numbers.map((n) => {
        const isSelected = selected === n;
        const { bg, text, ring } = colorFn ? colorFn(n) : defaultColors(n, isSelected);
        return (
          <button
            key={n}
            onClick={() => onSelect(n === selected ? null : n)}
            className={`number-chip number-grid-item font-mono font-bold transition-all duration-150
              ${isSelected
                ? `${bg} ${text} ${ring} ring-2 scale-110 shadow-md`
                : `${bg} ${text} hover:ring-2 ${ring}`
              }`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

function defaultColors(n, selected) {
  if (selected) return { bg: 'bg-amber-500', text: 'text-white', ring: 'ring-amber-500' };
  return {
    bg: 'bg-ink-100 dark:bg-ink-800 hover:bg-amber-400/20 dark:hover:bg-amber-400/10',
    text: 'text-ink-700 dark:text-ink-200',
    ring: 'ring-amber-400/50',
  };
}
