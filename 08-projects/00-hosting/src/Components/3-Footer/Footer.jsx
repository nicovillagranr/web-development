import { CONTACT } from "../../data/contact";

const ArrowUp = () => (
  <svg
    aria-label="Volver arriba"
    viewBox="0 0 640 640"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z" />
  </svg>
);

const LINKS = [
  { label: "Email", href: `mailto:${CONTACT.email}` },
  { label: "GitHub", href: CONTACT.github, external: true },
  { label: "LinkedIn", href: CONTACT.linkedin, external: true },
  { label: <ArrowUp />, href: "#hero" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="mt-16 border-t border-line">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-6">
        <p className="text-sm text-text-secondary">&copy; {year} {CONTACT.name}</p>

        <div className="flex flex-wrap items-center gap-2.5">
          {LINKS.map(({ label, href, external }) => (
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
