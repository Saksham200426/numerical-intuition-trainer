import React, { useEffect, useState } from 'react';
import { getProgress, getDailyStreak, getAccuracy } from '../utils/storageUtils';

export default function HomePage({ setPage }) {
  const [progress, setProgress] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const p = getProgress();
    setProgress(p);
    const { streak: s } = getDailyStreak();
    setStreak(s);
  }, []);

  const accuracy = progress ? getAccuracy(progress) : 0;

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-400/10 dark:bg-amber-400/5 blur-3xl" />
          <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-violet-500/10 dark:bg-violet-500/5 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 relative">
          {/* Stats row */}
          {progress && progress.totalQuestions > 0 && (
            <div className="flex items-center gap-4 mb-10 animate-fade-in">
              <StatPill icon="🔥" label={`${streak} day streak`} color="amber" />
              <StatPill icon="🎯" label={`${accuracy}% accuracy`} color="emerald" />
              <StatPill icon="📝" label={`${progress.totalQuestions} questions`} color="violet" />
            </div>
          )}

          {/* Heading */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 dark:bg-amber-400/10 border border-amber-400/30 mb-6 animate-slide-up">
              <span className="text-amber-600 dark:text-amber-400 text-xs font-display font-semibold tracking-wide uppercase">CAT & Banking Prep</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink-900 dark:text-ink-50 leading-tight mb-4 animate-slide-up" style={{ animationDelay: '0.05s' }}>
              Train Your{' '}
              <span className="relative">
                <span className="text-gradient-amber">Numerical</span>
              </span>
              {' '}Intuition
            </h1>
            <p className="text-ink-500 dark:text-ink-400 text-lg leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Master tables, squares & cubes with smart tricks, instant recall training, and spaced practice. Built for serious CAT & Banking aspirants.
            </p>

            {/* CTA Cards */}
            <div className="grid sm:grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <ModeCard
                onClick={() => setPage('learn')}
                icon="📚"
                title="Learn Mode"
                subtitle="Explore tables, squares & cubes with shortcut tricks and patterns"
                accent="amber"
                badge="Tricks & Tips"
              />
              <ModeCard
                onClick={() => setPage('practice')}
                icon="⚡"
                title="Practice Mode"
                subtitle="Timed quizzes with difficulty levels, streaks & instant feedback"
                accent="violet"
                badge="Quiz Time"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <FeatureCard
            icon="🧮"
            title="Tables 1–100"
            desc="With last-digit cycles, shortcut tricks, and CAT-specific patterns"
            delay="0s"
          />
          <FeatureCard
            icon="²"
            title="Squares 1–50"
            desc="(a±b)² expansion tricks, difference of squares, consecutive odds"
            delay="0.05s"
          />
          <FeatureCard
            icon="³"
            title="Cubes 1–20"
            desc="(a±b)³ expansions, consecutive odd number sums, last digit rules"
            delay="0.1s"
          />
        </div>

        {/* Progress CTA */}
        <div className="mt-6 p-5 rounded-2xl border border-dashed border-ink-200 dark:border-ink-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display font-semibold text-ink-900 dark:text-ink-100 text-sm">Track Your Progress</p>
            <p className="text-ink-500 dark:text-ink-500 text-xs mt-0.5">Accuracy stats, session history & daily streaks — all saved locally</p>
          </div>
          <button
            onClick={() => setPage('progress')}
            className="btn-primary bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100 hover:bg-ink-200 dark:hover:bg-ink-700 text-xs"
          >
            View Progress →
          </button>
        </div>
      </div>
    </div>
  );
}

function ModeCard({ onClick, icon, title, subtitle, accent, badge }) {
  const accentMap = {
    amber: 'from-amber-400/20 to-amber-600/10 border-amber-400/30 dark:from-amber-400/10 dark:to-amber-600/5 dark:border-amber-400/20',
    violet: 'from-violet-400/20 to-violet-600/10 border-violet-400/30 dark:from-violet-400/10 dark:to-violet-600/5 dark:border-violet-400/20',
  };
  const badgeMap = {
    amber: 'bg-amber-400/20 text-amber-700 dark:text-amber-400',
    violet: 'bg-violet-400/20 text-violet-700 dark:text-violet-400',
  };
  const btnMap = {
    amber: 'bg-amber-500 hover:bg-amber-600 text-white',
    violet: 'bg-violet-600 hover:bg-violet-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`group text-left p-6 rounded-2xl border bg-gradient-to-br ${accentMap[accent]} hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs font-display font-semibold px-2.5 py-1 rounded-full ${badgeMap[accent]}`}>
          {badge}
        </span>
      </div>
      <h3 className="font-display font-bold text-lg text-ink-900 dark:text-ink-50 mb-1.5">{title}</h3>
      <p className="text-ink-500 dark:text-ink-400 text-sm leading-relaxed mb-4">{subtitle}</p>
      <div className={`inline-flex items-center gap-1.5 text-xs font-display font-semibold px-3.5 py-1.5 rounded-lg ${btnMap[accent]} group-hover:gap-2.5 transition-all`}>
        Start <span>→</span>
      </div>
    </button>
  );
}

function StatPill({ icon, label, color }) {
  const colorMap = {
    amber: 'bg-amber-400/10 text-amber-700 dark:text-amber-400 border-amber-400/20',
    emerald: 'bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 border-emerald-400/20',
    violet: 'bg-violet-400/10 text-violet-700 dark:text-violet-400 border-violet-400/20',
  };
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-display font-semibold ${colorMap[color]}`}>
      <span className="flame-animate">{icon}</span>
      {label}
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div
      className="p-5 rounded-xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 animate-slide-up"
      style={{ animationDelay: delay }}
    >
      <div className="text-2xl mb-3 font-mono font-bold text-ink-400 dark:text-ink-600">{icon}</div>
      <h4 className="font-display font-semibold text-ink-900 dark:text-ink-100 text-sm mb-1">{title}</h4>
      <p className="text-ink-400 dark:text-ink-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}
