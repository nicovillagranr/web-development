import Sun from "../../assets/icons/sun.svg";
import Moon from "../../assets/icons/moon.svg";

export default function Header({ theme, onToggleTheme }) {
  const isLight = theme === "light";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-base-900/75 backdrop-blur-xl">
      <div className="container-page flex items-center justify-between gap-4 py-3.5">
        <span className="font-heading text-sm font-bold tracking-widest text-text-primary">Frontend Developer</span>

        <button
          onClick={onToggleTheme}
          aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-text-muted transition-all duration-200 hover:border-accent-border hover:text-text-primary">
          <img src={isLight ? Moon : Sun} alt="Theme Icon" className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
