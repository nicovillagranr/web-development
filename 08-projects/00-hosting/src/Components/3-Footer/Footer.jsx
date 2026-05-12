import arrowUpDark from "../../assets/icons/arrow-up-light.svg?url";
import arrowUpLight from "../../assets/icons/arrow-up-dark.svg?url";

const ArrowUp = ({ theme }) => (
  <img src={theme === "light" ? arrowUpDark : arrowUpLight} alt="Scroll to top" className="h-4 w-4" />
);

export default function Footer({ theme, profile }) {
  const year = new Date().getFullYear();

  const links = [
    { label: "Email", href: `mailto:${profile?.email || "#"}` },
    { label: "GitHub", href: profile?.github || "#", external: true },
    { label: "LinkedIn", href: profile?.linkedin || "#", external: true },
    { label: <ArrowUp theme={theme} />, href: "#hero" },
  ];

  return (
    <footer id="contacto" className="mt-16 border-t border-line">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" aria-hidden="true" className="h-8 w-8 shrink-0 rounded-md" />
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold text-text-primary">{profile?.name || "Portafolio"}</span>
            <span className="font-mono text-xs text-text-muted">{profile?.role || "Frontend Developer"} · &copy; {year}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {links.map(({ label, href, external }) => (
            <a key={href} href={href} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-text-secondary transition-all hover:border-accent-border hover:text-text-primary"
              {...(external && { target: "_blank", rel: "noreferrer" })}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
