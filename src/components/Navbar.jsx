import React from 'react';

export default function Navbar({ dark, setDark, page, setPage }) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-ink-100 dark:border-ink-800 bg-white/80 dark:bg-ink-950/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-white font-mono font-bold text-sm">N</span>
          </div>
          <span className="font-display font-bold text-ink-900 dark:text-ink-50 text-sm hidden sm:block">
            NIT <span className="text-ink-400 dark:text-ink-500 font-normal">Trainer</span>
          </span>
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <NavBtn active={page === 'learn'} onClick={() => setPage('learn')}>
            Learn
          </NavBtn>
          <NavBtn active={page === 'practice'} onClick={() => setPage('practice')}>
            Practice
          </NavBtn>
          <NavBtn active={page === 'progress'} onClick={() => setPage('progress')}>
            Progress
          </NavBtn>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(d => !d)}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors text-ink-500 dark:text-ink-400"
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? (
            <SunIcon />
          ) : (
            <MoonIcon />
          )}
        </button>
      </div>
    </nav>
  );
}

function NavBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-display font-medium transition-all duration-150 ${
        active
          ? 'bg-ink-900 dark:bg-ink-50 text-white dark:text-ink-950'
          : 'text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-ink-900 dark:hover:text-ink-100'
      }`}
    >
      {children}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}
