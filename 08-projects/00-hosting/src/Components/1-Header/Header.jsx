import { CONTACT } from "@/constants/contact";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"  x2="12" y2="4"  />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="2"  y1="12" x2="4"  y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Header({ theme, onToggleTheme }) {
  const isLight = theme === "light";

  return (
    <header id="top" className="sticky top-0 z-20 border-b border-line bg-base-900/75 backdrop-blur-xl">
      <div className="container-page flex items-center justify-between gap-4 py-3.5">
        <a className="font-heading text-sm font-bold uppercase tracking-widest text-text-primary">{CONTACT.name}</a>

        <button
          onClick={onToggleTheme}
          aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-text-muted transition-all duration-200 hover:border-accent-border hover:text-text-primary"
        >
          {isLight ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
}
