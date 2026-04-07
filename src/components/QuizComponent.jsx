import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  generateTableQuestion,
  generateSquareQuestion,
  generateCubeQuestion,
  generateMixedQuestion,
} from '../utils/mathUtils';
import { recordQuizResult } from '../utils/storageUtils';
 
const MODE_META = {
  table:  { label: 'Tables Quiz',  icon: '×', accent: 'amber',   gen: generateTableQuestion },
  square: { label: 'Squares Quiz', icon: '²', accent: 'emerald', gen: generateSquareQuestion },
  cube:   { label: 'Cubes Quiz',   icon: '³', accent: 'violet',  gen: generateCubeQuestion },
  mixed:  { label: 'Mixed Quiz',   icon: '∞', accent: 'rose',    gen: generateMixedQuestion },
};
 
export default function QuizComponent({ mode, difficulty, totalQuestions = 10, timePerQuestion = 20, onBack, onFinish }) {
  const [question, setQuestion]           = useState(null);
  const [questionNum, setQuestionNum]     = useState(1);
  const [score, setScore]                 = useState(0);
  const [streak, setStreak]               = useState(0);
  const [bestStreak, setBestStreak]       = useState(0);
  const [timeLeft, setTimeLeft]           = useState(timePerQuestion);
  const [feedback, setFeedback]           = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [results, setResults]             = useState([]);
  const [shake, setShake]                 = useState(false);
 
  const timerRef      = useRef(null);
  const streakRef     = useRef(0);
  const bestStreakRef = useRef(0);
  const meta = MODE_META[mode] || MODE_META.table;
 
  const diffLabel = difficulty === 'custom' ? 'custom' : difficulty;
 
  const loadQuestion = useCallback(() => {
    const q = meta.gen(difficulty === 'custom' ? 'medium' : difficulty);
    setQuestion(q);
    setFeedback(null);
    setSelectedOption(null);
    setTimeLeft(timePerQuestion);
    setIsTransitioning(false);
  }, [mode, difficulty, timePerQuestion]);
 
  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);
 
  // Timer
  useEffect(() => {
    if (feedback !== null || isTransitioning) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [question, feedback, isTransitioning]);
 
  function handleTimeout() {
    clearInterval(timerRef.current);
    setFeedback('timeout');
    streakRef.current = 0;
    setStreak(0);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setResults(r => [...r, { question, correct: false, timedOut: true }]);
    scheduleNext(false);
  }
 
  function handleAnswer(opt) {
    if (feedback !== null) return;
    clearInterval(timerRef.current);
    setSelectedOption(opt);
    const isCorrect = opt === question.answer;
 
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
      streakRef.current += 1;
      bestStreakRef.current = Math.max(bestStreakRef.current, streakRef.current);
      setStreak(streakRef.current);
      setBestStreak(bestStreakRef.current);
    } else {
      setFeedback('wrong');
      streakRef.current = 0;
      setStreak(0);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setResults(r => [...r, { question, chosen: opt, correct: isCorrect }]);
    scheduleNext(isCorrect);
  }
 
  function scheduleNext(isCorrect) {
    setIsTransitioning(true);
    setTimeout(() => {
      if (questionNum >= totalQuestions) {
        const finalScore = results.filter(r => r.correct).length + (isCorrect ? 1 : 0);
        recordQuizResult({ mode, difficulty: diffLabel, correct: finalScore, total: totalQuestions, streak: bestStreakRef.current });
        onFinish({ score: finalScore, total: totalQuestions, results, bestStreak: bestStreakRef.current, mode, difficulty: diffLabel });
      } else {
        setQuestionNum(n => n + 1);
        loadQuestion();
      }
    }, 1200);
  }
 
  if (!question) return <div className="flex items-center justify-center h-64"><LoadingSpinner /></div>;
 
  const timePercent = (timeLeft / timePerQuestion) * 100;
  const timerColor  = timePercent > 50 ? 'bg-emerald-500' : timePercent > 25 ? 'bg-amber-500' : 'bg-rose-500';
  const accentMap   = {
    amber:   'text-amber-600 dark:text-amber-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    violet:  'text-violet-600 dark:text-violet-400',
    rose:    'text-rose-500 dark:text-rose-400',
  };
 
  return (
    <div className="max-w-lg mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="text-ink-400 dark:text-ink-500 hover:text-ink-700 dark:hover:text-ink-200 transition-colors text-sm font-display flex items-center gap-1"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-600 dark:text-amber-400 text-xs font-display font-bold">
              <span className="flame-animate">🔥</span> {streak}
            </div>
          )}
          <span className="text-ink-400 dark:text-ink-500 text-sm font-mono">{questionNum}/{totalQuestions}</span>
        </div>
      </div>
 
      {/* Progress bar */}
      <div className="h-1 rounded-full bg-ink-100 dark:bg-ink-800 mb-6 overflow-hidden">
        <div
          className="h-full rounded-full bg-ink-900 dark:bg-ink-100 transition-all duration-300"
          style={{ width: `${(questionNum / totalQuestions) * 100}%` }}
        />
      </div>
 
      {/* Timer bar */}
      <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 mb-6 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 linear relative overflow-hidden ${timerColor}`}
          style={{ width: `${timePercent}%` }}
        >
          {timePercent > 30 && <div className="absolute inset-0 progress-shimmer" />}
        </div>
      </div>
 
      {/* Question Card */}
      <div
        className={`rounded-2xl border bg-white dark:bg-ink-900 border-ink-100 dark:border-ink-800 p-8 mb-5 text-center shadow-sm transition-all duration-300 ${
          shake ? 'animate-shake' : ''
        } ${feedback === 'correct' ? 'animate-correct-pulse' : feedback === 'wrong' || feedback === 'timeout' ? 'animate-wrong-pulse' : ''}`}
      >
        <span className={`inline-block text-xs font-display font-semibold px-2.5 py-1 rounded-full bg-ink-100 dark:bg-ink-800 ${accentMap[meta.accent]} mb-4`}>
          {meta.label}
        </span>
 
        {/* Timer display */}
        <div className="flex justify-center mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 transition-colors ${
            timeLeft <= 5
              ? 'border-rose-400 text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20'
              : 'border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-400'
          }`}>
            {timeLeft}
          </div>
        </div>
 
        <p className="font-display font-bold text-4xl sm:text-5xl text-ink-900 dark:text-ink-50 mb-2">
          {question.question}
        </p>
        {feedback === 'timeout' && (
          <p className="text-rose-500 dark:text-rose-400 text-sm font-display mt-3">
            Time's up! Answer: <strong>{question.answer}</strong>
          </p>
        )}
        {feedback === 'wrong' && selectedOption !== null && (
          <p className="text-rose-500 dark:text-rose-400 text-sm font-display mt-3">
            Correct answer: <strong className="font-mono">{question.answer}</strong>
          </p>
        )}
        {feedback === 'correct' && (
          <p className="text-emerald-500 dark:text-emerald-400 text-sm font-display mt-3 animate-pop">
            ✓ Correct!
          </p>
        )}
      </div>
 
      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selectedOption === opt;
          const isCorrect  = opt === question.answer;
          let btnClass = 'bg-white dark:bg-ink-900 border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 hover:border-ink-400 dark:hover:border-ink-500 hover:shadow-sm';
 
          if (feedback !== null) {
            if (isCorrect)       btnClass = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 text-emerald-700 dark:text-emerald-300';
            else if (isSelected) btnClass = 'bg-rose-50 dark:bg-rose-900/30 border-rose-400 text-rose-600 dark:text-rose-400';
            else                 btnClass = 'bg-ink-50 dark:bg-ink-800/50 border-ink-100 dark:border-ink-800 text-ink-400 dark:text-ink-600';
          }
 
          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={feedback !== null}
              className={`p-4 rounded-xl border-2 font-display font-bold text-xl transition-all duration-150 active:scale-95 disabled:cursor-not-allowed ${btnClass}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {opt}
              {feedback !== null && isCorrect  && <span className="ml-2 text-emerald-500">✓</span>}
              {feedback !== null && isSelected && !isCorrect && <span className="ml-2 text-rose-400">✗</span>}
            </button>
          );
        })}
      </div>
 
      {/* Score display */}
      <div className="flex items-center justify-center gap-4 mt-6 text-sm text-ink-500 dark:text-ink-400">
        <span className="font-display">Score: <strong className="text-ink-900 dark:text-ink-100">{score}</strong></span>
        <span>·</span>
        <span className="font-display">Best streak: <strong className="text-amber-600 dark:text-amber-400">{bestStreak}</strong></span>
      </div>
    </div>
  );
}
 
function LoadingSpinner() {
  return (
    <div className="w-8 h-8 border-2 border-ink-200 dark:border-ink-700 border-t-amber-400 rounded-full animate-spin" />
  );
}
