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
  { id: 'easy', label: 'Easy', desc: 'Smaller numbers, 30s per question', color: 'emerald' },
  { id: 'medium', label: 'Medium', desc: 'Moderate range, 20s per question', color: 'amber' },
  { id: 'hard', label: 'Hard', desc: 'Large numbers, 12s per question', color: 'rose' },
];
 
const QUESTION_COUNTS = [5, 10, 15, 20, 25];
const TIME_OPTIONS = [5, 10, 15, 20, 30, 45, 60];
 
export default function PracticePage({ setPage }) {
  const [view, setView] = useState('setup'); // 'setup' | 'quiz' | 'results'
  const [subMode, setSubMode] = useState('standard'); // 'standard' | 'custom'
 
  // Standard mode state
  const [selectedMode, setSelectedMode] = useState('table');
  const [selectedDiff, setSelectedDiff] = useState('medium');
 
  // Custom mode state
  const [customMode, setCustomMode] = useState('table');
  const [customCount, setCustomCount] = useState(10);
  const [customTime, setCustomTime] = useState(20);
 
  const [quizResult, setQuizResult] = useState(null);
 
  const TIME_PER_Q = { easy: 30, medium: 20, hard: 12 };
 
  function startQuiz() { setView('quiz'); }
  function handleFinish(result) { setQuizResult(result); setView('results'); }
  function handleRetry() { setView('quiz'); setQuizResult(null); }
  function handleBackToSetup() { setView('setup'); setQuizResult(null); }
 
  // Props passed to QuizComponent
  const quizProps = subMode === 'standard'
    ? { mode: selectedMode, difficulty: selectedDiff, totalQuestions: 10, timePerQuestion: TIME_PER_Q[selectedDiff] }
    : { mode: customMode, difficulty: 'custom', totalQuestions: customCount, timePerQuestion: customTime };
 
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
 
        {view === 'setup' && (
          <div className="animate-fade-in">
            <div className="mb-7">
              <h2 className="font-display font-bold text-2xl text-ink-900 dark:text-ink-50 mb-1">Practice Mode</h2>
              <p className="text-ink-400 dark:text-ink-500 text-sm">Choose your session type and get started.</p>
            </div>
 
            {/* Sub-mode toggle */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setSubMode('standard')}
                className={`flex-1 py-3 px-5 rounded-xl border-2 font-display font-semibold text-sm transition-all duration-150 ${
                  subMode === 'standard'
                    ? 'border-ink-900 dark:border-ink-100 bg-ink-900 dark:bg-ink-100 text-white dark:text-ink-950'
                    : 'border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-500 dark:text-ink-400 hover:border-ink-400 dark:hover:border-ink-500'
                }`}
              >
                ⚡ Standard
              </button>
              <button
                onClick={() => setSubMode('custom')}
                className={`flex-1 py-3 px-5 rounded-xl border-2 font-display font-semibold text-sm transition-all duration-150 ${
                  subMode === 'custom'
                    ? 'border-violet-500 bg-violet-500 text-white'
                    : 'border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-500 dark:text-ink-400 hover:border-violet-300 dark:hover:border-violet-700'
                }`}
              >
                🎛️ Custom
              </button>
            </div>
 
            {/* ── STANDARD MODE ── */}
            {subMode === 'standard' && (
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
                        amber: selected ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 ring-2 ring-amber-400/30' : 'border-ink-200 dark:border-ink-700 hover:border-amber-300 dark:hover:border-amber-700',
                        emerald: selected ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 ring-2 ring-emerald-400/30' : 'border-ink-200 dark:border-ink-700 hover:border-emerald-300 dark:hover:border-emerald-700',
                        violet: selected ? 'border-violet-400 bg-violet-50 dark:bg-violet-900/20 ring-2 ring-violet-400/30' : 'border-ink-200 dark:border-ink-700 hover:border-violet-300 dark:hover:border-violet-700',
                        rose: selected ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 ring-2 ring-rose-400/30' : 'border-ink-200 dark:border-ink-700 hover:border-rose-300 dark:hover:border-rose-700',
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
                          {selected && <div className="mt-2 w-2 h-2 rounded-full bg-ink-900 dark:bg-ink-100" />}
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
                        emerald: selected ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-ink-200 dark:border-ink-700 hover:border-emerald-300',
                        amber: selected ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-ink-200 dark:border-ink-700 hover:border-amber-300',
                        rose: selected ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20' : 'border-ink-200 dark:border-ink-700 hover:border-rose-300',
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
            )}
 
            {/* ── CUSTOM MODE ── */}
            {subMode === 'custom' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Quiz Type + Question Count */}
                <div className="space-y-7">
                  {/* Quiz Type */}
                  <div>
                    <h3 className="font-display font-semibold text-sm text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-3">
                      Quiz Type
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {MODES.map(m => {
                        const selected = customMode === m.id;
                        const accentMap = {
                          amber: selected ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 ring-2 ring-amber-400/30' : 'border-ink-200 dark:border-ink-700 hover:border-amber-300 dark:hover:border-amber-700',
                          emerald: selected ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 ring-2 ring-emerald-400/30' : 'border-ink-200 dark:border-ink-700 hover:border-emerald-300 dark:hover:border-emerald-700',
                          violet: selected ? 'border-violet-400 bg-violet-50 dark:bg-violet-900/20 ring-2 ring-violet-400/30' : 'border-ink-200 dark:border-ink-700 hover:border-violet-300 dark:hover:border-violet-700',
                          rose: selected ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 ring-2 ring-rose-400/30' : 'border-ink-200 dark:border-ink-700 hover:border-rose-300 dark:hover:border-rose-700',
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
                            onClick={() => setCustomMode(m.id)}
                            className={`text-left p-4 rounded-xl border-2 bg-white dark:bg-ink-900 transition-all duration-150 ${accentMap[m.accent]}`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-lg mb-3 ${iconColorMap[m.accent]}`}>
                              {m.icon}
                            </div>
                            <p className="font-display font-semibold text-sm text-ink-900 dark:text-ink-100">{m.label}</p>
                            <p className="text-ink-400 dark:text-ink-500 text-xs mt-0.5">{m.sub}</p>
                            {selected && <div className="mt-2 w-2 h-2 rounded-full bg-ink-900 dark:bg-ink-100" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
 
                  {/* Number of Questions */}
                  <div>
                    <h3 className="font-display font-semibold text-sm text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-3">
                      Number of Questions
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {QUESTION_COUNTS.map(n => (
                        <button
                          key={n}
                          onClick={() => setCustomCount(n)}
                          className={`w-14 h-12 rounded-xl border-2 font-display font-bold text-sm transition-all duration-150 ${
                            customCount === n
                              ? 'border-violet-500 bg-violet-500 text-white'
                              : 'border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-300 hover:border-violet-300 dark:hover:border-violet-700'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
 
                {/* Right: Time per Question + Info + Start */}
                <div className="space-y-7">
                  {/* Time per Question */}
                  <div>
                    <h3 className="font-display font-semibold text-sm text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-3">
                      Time per Question
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {TIME_OPTIONS.map(t => (
                        <button
                          key={t}
                          onClick={() => setCustomTime(t)}
                          className={`w-16 h-12 rounded-xl border-2 font-display font-bold text-sm transition-all duration-150 ${
                            customTime === t
                              ? 'border-violet-500 bg-violet-500 text-white'
                              : 'border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-300 hover:border-violet-300 dark:hover:border-violet-700'
                          }`}
                        >
                          {t}s
                        </button>
                      ))}
                    </div>
                    <p className="text-ink-400 dark:text-ink-500 text-xs mt-2">Selected: {customTime} seconds per question</p>
                  </div>
 
                  {/* Summary box */}
                  <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/40">
                    <p className="font-display font-semibold text-xs text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-3">Session Summary</p>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="font-display font-bold text-lg text-ink-900 dark:text-ink-100">{customCount}</p>
                        <p className="text-ink-400 dark:text-ink-500 text-xs">Questions</p>
                      </div>
                      <div>
                        <p className="font-display font-bold text-lg text-ink-900 dark:text-ink-100">{customTime}s</p>
                        <p className="text-ink-400 dark:text-ink-500 text-xs">Per Question</p>
                      </div>
                      <div>
                        <p className="font-display font-bold text-lg text-ink-900 dark:text-ink-100">
                          {Math.floor((customCount * customTime) / 60)}m {(customCount * customTime) % 60 > 0 ? `${(customCount * customTime) % 60}s` : ''}
                        </p>
                        <p className="text-ink-400 dark:text-ink-500 text-xs">Total Time</p>
                      </div>
                    </div>
                  </div>
 
                  <button
                    onClick={startQuiz}
                    className="btn-primary w-full justify-center bg-violet-600 hover:bg-violet-700 text-white text-base py-3"
                  >
                    Start Custom Quiz 🎛️
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
 
        {view === 'quiz' && (
          <div className="animate-fade-in">
            <QuizComponent
              mode={quizProps.mode}
              difficulty={quizProps.difficulty}
              totalQuestions={quizProps.totalQuestions}
              timePerQuestion={quizProps.timePerQuestion}
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