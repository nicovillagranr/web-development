import arrowUpDark from "../../assets/icons/arrow-up-light.svg?url";
import arrowUpLight from "../../assets/icons/arrow-up-dark.svg?url";
import githubLight from "../../assets/icons/github-light.svg?url";
import githubDark from "../../assets/icons/github-dark.svg?url";

const ArrowUp = ({ theme }) => (
  <img src={theme === "light" ? arrowUpDark : arrowUpLight} alt="Scroll to top" className="h-4 w-4" />
);

const GitHubIcon = ({ theme }) => (
  <img src={theme === "light" ? githubLight : githubDark} alt="GitHub" className="h-4 w-4" />
);

export default function Footer({ theme, profile }) {
  const year = new Date().getFullYear();

  const links = [
    { id: "email", label: "Email", href: `mailto:${profile?.email || "#"}` },
    { id: "linkedin", label: "LinkedIn", href: profile?.linkedin || "#", external: true },
    { id: "github", label: <GitHubIcon theme={theme} />, href: profile?.github || "#", external: true },
    { id: "top", label: <ArrowUp theme={theme} />, href: "#hero" },
  ];

  return (
    <footer id="contacto" className="mt-16 border-t border-line">
      <div className="container-page flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" aria-hidden="true" className="h-8 w-8 shrink-0 rounded-md [html.light_&]:invert" />
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold text-text-primary">{profile?.name || "Portafolio"}</span>
            <span className="font-mono text-xs text-text-muted">{profile?.role || "Frontend Developer"} · &copy; {year}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {links.map(({ id, label, href, external }) => (
            <a key={id} href={href} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-text-secondary transition-all hover:border-accent-border hover:text-text-primary"
              {...(external && { target: "_blank", rel: "noreferrer" })}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
