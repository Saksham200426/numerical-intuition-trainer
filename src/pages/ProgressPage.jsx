import React, { useState, useEffect } from 'react';
import { getProgress, getDailyStreak, getAccuracy, clearProgress } from '../utils/storageUtils';

export default function ProgressPage({ setPage }) {
  const [progress, setProgress] = useState(null);
  const [streak, setStreak] = useState({ streak: 0, lastDate: null });
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  function loadData() {
    setProgress(getProgress());
    setStreak(getDailyStreak());
  }

  useEffect(() => { loadData(); }, []);

  function handleClear() {
    clearProgress();
    loadData();
    setShowClearConfirm(false);
  }

  if (!progress) return null;

  const accuracy = getAccuracy(progress);
  const hasData = progress.totalQuestions > 0;

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-7 animate-slide-up">
          <div>
            <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-ink-50">Your Progress</h2>
            <p className="text-ink-400 dark:text-ink-500 text-sm mt-0.5">All data saved locally on this device</p>
          </div>
          {hasData && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-xs text-ink-400 dark:text-ink-600 hover:text-rose-500 dark:hover:text-rose-400 transition-colors font-display"
            >
              Reset
            </button>
          )}
        </div>

        {!hasData ? (
          <EmptyState setPage={setPage} />
        ) : (
          <div className="space-y-5">
            {/* Top stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-slide-up" style={{ animationDelay: '0.05s' }}>
              <StatCard
                icon="🎯"
                value={`${accuracy}%`}
                label="Overall Accuracy"
                color={accuracy >= 70 ? 'emerald' : accuracy >= 50 ? 'amber' : 'rose'}
              />
              <StatCard
                icon="📝"
                value={progress.totalQuestions}
                label="Total Questions"
                color="violet"
              />
              <StatCard
                icon="✅"
                value={progress.totalCorrect}
                label="Correct Answers"
                color="emerald"
              />
              <StatCard
                icon="🔥"
                value={streak.streak}
                label="Day Streak"
                color="amber"
              />
            </div>

            {/* By mode */}
            <div className="grid sm:grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {[
                { key: 'table', label: 'Tables', icon: '×', color: 'amber' },
                { key: 'square', label: 'Squares', icon: '²', color: 'emerald' },
                { key: 'cube', label: 'Cubes', icon: '³', color: 'violet' },
              ].map(({ key, label, icon, color }) => {
                const data = progress.byMode[key] || { questions: 0, correct: 0 };
                const acc = data.questions > 0 ? Math.round((data.correct / data.questions) * 100) : null;
                return (
                  <ModeCard key={key} icon={icon} label={label} data={data} accuracy={acc} color={color} />
                );
              })}
            </div>

            {/* By difficulty */}
            <div className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-5 animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <h3 className="font-display font-semibold text-sm text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-4">
                By Difficulty
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'easy', label: 'Easy', color: 'emerald' },
                  { key: 'medium', label: 'Medium', color: 'amber' },
                  { key: 'hard', label: 'Hard', color: 'rose' },
                ].map(({ key, label, color }) => {
                  const data = progress.byDifficulty[key] || { questions: 0, correct: 0 };
                  const acc = data.questions > 0 ? Math.round((data.correct / data.questions) * 100) : 0;
                  const barColor = { emerald: 'bg-emerald-500', amber: 'bg-amber-500', rose: 'bg-rose-500' }[color];
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-display font-medium text-sm text-ink-700 dark:text-ink-300">{label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-ink-400 dark:text-ink-500 text-xs font-mono">{data.questions} q</span>
                          <span className={`font-display font-bold text-sm ${data.questions > 0 ? `text-${color}-600 dark:text-${color}-400` : 'text-ink-300 dark:text-ink-600'}`}>
                            {data.questions > 0 ? `${acc}%` : '—'}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                          style={{ width: `${acc}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Best streak */}
            {progress.bestStreak > 0 && (
              <div className="rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/10 p-5 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl flame-animate">🔥</div>
                <div>
                  <p className="font-display font-bold text-lg text-amber-700 dark:text-amber-400">{progress.bestStreak}</p>
                  <p className="text-amber-600 dark:text-amber-500 text-sm">Best answer streak</p>
                </div>
              </div>
            )}

            {/* Recent sessions */}
            {progress.sessions && progress.sessions.length > 0 && (
              <div className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 overflow-hidden animate-slide-up" style={{ animationDelay: '0.25s' }}>
                <div className="px-5 py-3.5 border-b border-ink-100 dark:border-ink-800">
                  <h3 className="font-display font-semibold text-sm text-ink-500 dark:text-ink-400 uppercase tracking-wider">Recent Sessions</h3>
                </div>
                <div className="divide-y divide-ink-50 dark:divide-ink-800/60">
                  {progress.sessions.slice(0, 10).map((s, i) => (
                    <SessionRow key={i} session={s} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => setPage('practice')}
                className="btn-primary flex-1 justify-center bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-950 hover:bg-ink-700 dark:hover:bg-white"
              >
                Practice More ⚡
              </button>
              <button
                onClick={() => setPage('learn')}
                className="btn-primary flex-1 justify-center bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-ink-200"
              >
                Learn Mode 📚
              </button>
            </div>
          </div>
        )}

        {/* Clear confirm modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-700 p-6 max-w-sm w-full animate-pop shadow-xl">
              <h4 className="font-display font-bold text-lg text-ink-900 dark:text-ink-100 mb-2">Reset Progress?</h4>
              <p className="text-ink-500 dark:text-ink-400 text-sm mb-5">This will permanently delete all your quiz history, accuracy stats, and streak data.</p>
              <div className="flex gap-2">
                <button onClick={handleClear} className="btn-primary flex-1 justify-center bg-rose-500 hover:bg-rose-600 text-white">
                  Yes, Reset
                </button>
                <button onClick={() => setShowClearConfirm(false)} className="btn-primary flex-1 justify-center bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  const colorMap = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    amber: 'text-amber-600 dark:text-amber-400',
    violet: 'text-violet-600 dark:text-violet-400',
    rose: 'text-rose-500 dark:text-rose-400',
  };
  return (
    <div className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-4">
      <span className="text-xl block mb-2">{icon}</span>
      <p className={`font-display font-extrabold text-2xl ${colorMap[color]}`}>{value}</p>
      <p className="text-ink-400 dark:text-ink-500 text-xs font-display mt-0.5">{label}</p>
    </div>
  );
}

function ModeCard({ icon, label, data, accuracy, color }) {
  const colorMap = {
    amber: { bar: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', icon: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400' },
    emerald: { bar: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' },
    violet: { bar: 'bg-violet-500', text: 'text-violet-600 dark:text-violet-400', icon: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400' },
  };
  const c = colorMap[color];
  return (
    <div className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-lg mb-3 ${c.icon}`}>
        {icon}
      </div>
      <p className="font-display font-semibold text-sm text-ink-900 dark:text-ink-100">{label}</p>
      <p className={`font-display font-bold text-2xl mt-1 ${accuracy !== null ? c.text : 'text-ink-300 dark:text-ink-600'}`}>
        {accuracy !== null ? `${accuracy}%` : '—'}
      </p>
      <p className="text-ink-400 dark:text-ink-500 text-xs">{data.questions} questions</p>
      {accuracy !== null && (
        <div className="mt-3 h-1 rounded-full bg-ink-100 dark:bg-ink-800">
          <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${accuracy}%` }} />
        </div>
      )}
    </div>
  );
}

function SessionRow({ session }) {
  const modeLabel = { table: '×', square: '²', cube: '³', mixed: '∞' }[session.mode] || '?';
  const diffColor = { easy: 'text-emerald-500', medium: 'text-amber-500', hard: 'text-rose-500' }[session.difficulty];
  const date = new Date(session.date);
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

  return (
    <div className="flex items-center gap-3 px-5 py-3">
      <span className="w-8 h-8 rounded-lg bg-ink-100 dark:bg-ink-800 flex items-center justify-center font-mono font-bold text-sm text-ink-500 dark:text-ink-400 shrink-0">
        {modeLabel}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display font-medium text-sm text-ink-900 dark:text-ink-100 capitalize">
            {session.mode}
          </span>
          <span className={`text-xs font-display capitalize ${diffColor}`}>{session.difficulty}</span>
        </div>
        <p className="text-ink-400 dark:text-ink-500 text-xs">{dateStr} · {timeStr}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-display font-bold text-sm text-ink-900 dark:text-ink-100">
          {session.correct}/{session.total}
        </p>
        <p className={`text-xs font-display ${session.accuracy >= 70 ? 'text-emerald-500' : session.accuracy >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
          {session.accuracy}%
        </p>
      </div>
    </div>
  );
}

function EmptyState({ setPage }) {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="text-5xl mb-4">📊</div>
      <h3 className="font-display font-bold text-xl text-ink-900 dark:text-ink-100 mb-2">No data yet</h3>
      <p className="text-ink-400 dark:text-ink-500 text-sm mb-6 max-w-xs mx-auto">
        Complete your first quiz to start tracking your accuracy and streak.
      </p>
      <button
        onClick={() => setPage('practice')}
        className="btn-primary bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-950 hover:bg-ink-700"
      >
        Take a Quiz ⚡
      </button>
    </div>
  );
}
