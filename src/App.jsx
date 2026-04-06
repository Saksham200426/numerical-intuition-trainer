import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import PracticePage from './pages/PracticePage';
import ProgressPage from './pages/ProgressPage';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const [page, setPage] = useState('home');
  const [dark, setDark] = useDarkMode();

  const pages = {
    home: <HomePage setPage={setPage} />,
    learn: <LearnPage />,
    practice: <PracticePage setPage={setPage} />,
    progress: <ProgressPage setPage={setPage} />,
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300">
      <Navbar dark={dark} setDark={setDark} page={page} setPage={setPage} />
      <main key={page} className="animate-fade-in">
        {pages[page] || pages.home}
      </main>
    </div>
  );
}
