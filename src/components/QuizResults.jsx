import React from 'react';

export default function QuizResults({ result, onRetry, onBack, onHome }) {
  const { score, total, bestStreak, mode, difficulty } = result;
  const accuracy = Math.round((score / total) * 100);

  const grade = accuracy >= 90 ? { label: 'Excellent!', emoji: '🏆', color: 'text-amber-500' }
    : accuracy >= 70 ? { label: 'Great Job!', emoji: '⭐', color: 'text-emerald-500' }
    : accuracy >= 50 ? { label: 'Keep Going!', emoji: '💪', color: 'text-violet-500' }
    : { label: 'Keep Practicing!', emoji: '📚', color: 'text-rose-500' };

  const modeLabel = { table: 'Tables', square: 'Squares', cube: 'Cubes', mixed: 'Mixed' }[mode] || mode;
  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <div className="max-w-md mx-auto animate-pop">
      {/* Result Card */}
      <div className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 overflow-hidden shadow-lg">
        {/* Header band */}
        <div className={`px-6 pt-8 pb-6 text-center bg-gradient-to-b from-ink-50 dark:from-ink-800/40 to-transparent`}>
          <div className="text-5xl mb-3">{grade.emoji}</div>
          <h3 className={`font-display font-extrabold text-2xl ${grade.color}`}>{grade.label}</h3>
          <p className="text-ink-400 dark:text-ink-500 text-sm mt-1">{modeLabel} · {diffLabel}</p>
        </div>

        {/* Big score */}
        <div className="px-6 pb-6">
          <div className="flex justify-center gap-6 mb-6">
            <BigStat value={`${score}/${total}`} label="Score" color="text-ink-900 dark:text-ink-50" />
            <div className="w-px bg-ink-100 dark:bg-ink-800" />
            <BigStat value={`${accuracy}%`} label="Accuracy" color={accuracy >= 70 ? 'text-emerald-500' : accuracy >= 50 ? 'text-amber-500' : 'text-rose-500'} />
            <div className="w-px bg-ink-100 dark:bg-ink-800" />
            <BigStat value={bestStreak} label="Best Streak" color="text-amber-500" prefix="🔥" />
          </div>

          {/* Accuracy bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-ink-400 dark:text-ink-500 mb-2">
              <span className="font-display">Accuracy</span>
              <span className="font-mono">{accuracy}%</span>
            </div>
            <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  accuracy >= 70 ? 'bg-emerald-500' : accuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>

          {/* Result breakdown */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
              <p className="text-emerald-700 dark:text-emerald-400 font-display font-bold text-xl">{score}</p>
              <p className="text-emerald-600 dark:text-emerald-500 text-xs font-display">Correct</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/40">
              <p className="text-rose-600 dark:text-rose-400 font-display font-bold text-xl">{total - score}</p>
              <p className="text-rose-500 dark:text-rose-500 text-xs font-display">Wrong / Timeout</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={onRetry}
              className="btn-primary w-full bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-950 hover:bg-ink-700 dark:hover:bg-white justify-center"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="btn-primary w-full bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-ink-200 dark:hover:bg-ink-700 justify-center"
            >
              Change Settings
            </button>
            <button
              onClick={onHome}
              className="text-ink-400 dark:text-ink-500 hover:text-ink-700 dark:hover:text-ink-200 text-sm font-display transition-colors text-center py-1"
            >
              ← Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BigStat({ value, label, color, prefix }) {
  return (
    <div className="text-center">
      <p className={`font-display font-extrabold text-2xl ${color}`}>
        {prefix && <span className="mr-0.5">{prefix}</span>}{value}
      </p>
      <p className="text-ink-400 dark:text-ink-500 text-xs font-display mt-0.5">{label}</p>
    </div>
  );
}
