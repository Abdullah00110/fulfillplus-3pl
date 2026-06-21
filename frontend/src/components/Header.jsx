export default function Header({ dark, onToggleTheme }) {
  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-white dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 w-full max-w-xs bg-slate-100 dark:bg-slate-700/50 rounded-md px-3 py-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" className="text-slate-400">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search orders…"
          className="bg-transparent outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition text-lg"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 grid place-items-center text-xs font-medium">
            AS
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-200 hidden sm:block">
            Abdullah
          </span>
        </div>
      </div>
    </header>
  );
}