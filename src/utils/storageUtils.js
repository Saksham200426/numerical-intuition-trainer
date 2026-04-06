const STORAGE_KEY = 'nit_progress';
const STREAK_KEY = 'nit_streak';

export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return JSON.parse(raw);
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Could not save progress:', e);
  }
}

function getDefaultProgress() {
  return {
    totalQuestions: 0,
    totalCorrect: 0,
    byMode: {
      table: { questions: 0, correct: 0 },
      square: { questions: 0, correct: 0 },
      cube: { questions: 0, correct: 0 },
    },
    byDifficulty: {
      easy: { questions: 0, correct: 0 },
      medium: { questions: 0, correct: 0 },
      hard: { questions: 0, correct: 0 },
    },
    sessions: [],
    bestStreak: 0,
  };
}

export function recordQuizResult({ mode, difficulty, correct, total, streak }) {
  const progress = getProgress();
  progress.totalQuestions += total;
  progress.totalCorrect += correct;

  if (progress.byMode[mode]) {
    progress.byMode[mode].questions += total;
    progress.byMode[mode].correct += correct;
  }
  if (progress.byDifficulty[difficulty]) {
    progress.byDifficulty[difficulty].questions += total;
    progress.byDifficulty[difficulty].correct += correct;
  }

  if (streak > (progress.bestStreak || 0)) {
    progress.bestStreak = streak;
  }

  // Keep last 30 sessions
  const session = {
    date: new Date().toISOString(),
    mode,
    difficulty,
    correct,
    total,
    accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
  };
  progress.sessions = [session, ...(progress.sessions || [])].slice(0, 30);

  saveProgress(progress);
  updateDailyStreak();
  return progress;
}

export function getAccuracy(progress) {
  if (!progress.totalQuestions) return 0;
  return Math.round((progress.totalCorrect / progress.totalQuestions) * 100);
}

// ============================================================
// DAILY STREAK
// ============================================================

export function getDailyStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { streak: 0, lastDate: null };
    return JSON.parse(raw);
  } catch {
    return { streak: 0, lastDate: null };
  }
}

export function updateDailyStreak() {
  const { streak, lastDate } = getDailyStreak();
  const today = getDateString(new Date());

  if (lastDate === today) return streak; // already updated today

  const yesterday = getDateString(new Date(Date.now() - 86400000));
  const newStreak = lastDate === yesterday ? streak + 1 : 1;

  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify({ streak: newStreak, lastDate: today }));
  } catch (e) {
    console.warn('Could not save streak:', e);
  }
  return newStreak;
}

function getDateString(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STREAK_KEY);
  } catch (e) {}
}
