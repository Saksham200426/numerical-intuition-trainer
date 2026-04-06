import React, { useState } from 'react';
import QuizComponent from '../components/QuizComponent';
import QuizResults from '../components/QuizResults';

const MODES = [
  { id: 'table', label: 'Tables Quiz', icon: '×', sub: 'Multiplication tables 1–30', accent: 'amber' },
  { id: 'square', label: 'Squares Quiz', icon: '²', sub: 'Perfect squares 1–50', accent: 'emerald' },
  { id: 'cube', label: 'Cubes Quiz', icon: '³', sub: 'Perfect cubes 1–20', accent: 'violet' },
  { id: 'mixed', label: 'Mixed Quiz', icon: '∞', sub: 'All types, random', accent: 'rose' },
];

const DIFFICULTIES = [
  {
    id: 'easy',
    label: 'Easy',
    desc: 'Smaller numbers, 30s per question',
    color: 'emerald',
  },
  {
    id: 'medium',
    label: 'Medium',
    desc: 'Moderate range, 20s per question',
    color: 'amber',
  },
  {
    id: 'hard',
    label: 'Hard',
    desc: 'Large numbers, 12s per question',
    color: 'rose',
  },
];

export default function PracticePage({ setPage }) {
  const [view, setView] = useState('setup'); // 'setup' | 'quiz' | 'results'
  const [selectedMode, setSelectedMode] = useState('table');
  const [selectedDiff, setSelectedDiff] = useState('medium');
  const [quizResult, setQuizResult] = useState(null);

  function startQuiz() {
    setView('quiz');
  }

  function handleFinish(result) {
    setQuizResult(result);
    setView('results');
  }

  function handleRetry() {
    setView('quiz');
    setQuizResult(null);
  }

  function handleBackToSetup() {
    setView('setup');
    setQuizResult(null);
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {view === 'setup' && (
          <div className="animate-fade-in">
            <div className="mb-7">
              <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-ink-50 mb-1">Practice Mode</h2>
              <p className="text-ink-400 dark:text-ink-500 text-sm">10 questions per session. Choose your mode and difficulty.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Mode selection */}
              <div>
                <h3 className="font-display font-semibold text-sm text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-3">
                  Quiz Type
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MODES.map(m => {
                    const selected = selectedMode === m.id;
                    const accentMap = {
                      amber: selected
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 ring-2 ring-amber-400/30'
                        : 'border-ink-200 dark:border-ink-700 hover:border-amber-300 dark:hover:border-amber-700',
                      emerald: selected
                        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 ring-2 ring-emerald-400/30'
                        : 'border-ink-200 dark:border-ink-700 hover:border-emerald-300 dark:hover:border-emerald-700',
                      violet: selected
                        ? 'border-violet-400 bg-violet-50 dark:bg-violet-900/20 ring-2 ring-violet-400/30'
                        : 'border-ink-200 dark:border-ink-700 hover:border-violet-300 dark:hover:border-violet-700',
                      rose: selected
                        ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 ring-2 ring-rose-400/30'
                        : 'border-ink-200 dark:border-ink-700 hover:border-rose-300 dark:hover:border-rose-700',
                    };
                    const iconColorMap = {
                      amber: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
                      emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
                      violet: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400',
                      rose: 'bg-rose-100 dark:bg-rose-900/40 text-rose-500 dark:text-rose-400',
                    };

                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMode(m.id)}
                        className={`text-left p-4 rounded-xl border-2 bg-white dark:bg-ink-900 transition-all duration-150 ${accentMap[m.accent]}`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-lg mb-3 ${iconColorMap[m.accent]}`}>
                          {m.icon}
                        </div>
                        <p className="font-display font-semibold text-sm text-ink-900 dark:text-ink-100">{m.label}</p>
                        <p className="text-ink-400 dark:text-ink-500 text-xs mt-0.5">{m.sub}</p>
                        {selected && (
                          <div className="mt-2 w-2 h-2 rounded-full bg-ink-900 dark:bg-ink-100" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty + Start */}
              <div>
                <h3 className="font-display font-semibold text-sm text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-3">
                  Difficulty
                </h3>
                <div className="space-y-2 mb-6">
                  {DIFFICULTIES.map(d => {
                    const selected = selectedDiff === d.id;
                    const colorMap = {
                      emerald: selected
                        ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-ink-200 dark:border-ink-700 hover:border-emerald-300',
                      amber: selected
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                        : 'border-ink-200 dark:border-ink-700 hover:border-amber-300',
                      rose: selected
                        ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                        : 'border-ink-200 dark:border-ink-700 hover:border-rose-300',
                    };
                    const dotColor = { emerald: 'bg-emerald-500', amber: 'bg-amber-500', rose: 'bg-rose-500' };

                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDiff(d.id)}
                        className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white dark:bg-ink-900 transition-all duration-150 ${colorMap[d.color]}`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${selected ? dotColor[d.color] : 'bg-ink-200 dark:bg-ink-700'}`} />
                        <div>
                          <p className="font-display font-semibold text-sm text-ink-900 dark:text-ink-100">{d.label}</p>
                          <p className="text-ink-400 dark:text-ink-500 text-xs">{d.desc}</p>
                        </div>
                        {selected && <span className="ml-auto text-ink-400 dark:text-ink-500 text-xs">✓</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Info box */}
                <div className="p-4 rounded-xl bg-ink-100 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 mb-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="font-display font-bold text-lg text-ink-900 dark:text-ink-100">10</p>
                      <p className="text-ink-400 dark:text-ink-500 text-xs">Questions</p>
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-ink-900 dark:text-ink-100">
                        {selectedDiff === 'easy' ? '30s' : selectedDiff === 'medium' ? '20s' : '12s'}
                      </p>
                      <p className="text-ink-400 dark:text-ink-500 text-xs">Per Question</p>
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-ink-900 dark:text-ink-100">4</p>
                      <p className="text-ink-400 dark:text-ink-500 text-xs">Options</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={startQuiz}
                  className="btn-primary w-full justify-center bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-950 hover:bg-ink-700 dark:hover:bg-white text-base py-3"
                >
                  Start Quiz ⚡
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'quiz' && (
          <div className="animate-fade-in">
            <QuizComponent
              mode={selectedMode}
              difficulty={selectedDiff}
              onBack={handleBackToSetup}
              onFinish={handleFinish}
            />
          </div>
        )}

        {view === 'results' && quizResult && (
          <div className="animate-fade-in">
            <QuizResults
              result={quizResult}
              onRetry={handleRetry}
              onBack={handleBackToSetup}
              onHome={() => setPage('home')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
