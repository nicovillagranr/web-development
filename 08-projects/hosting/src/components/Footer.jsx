import { CONTACT } from "@/constants/contact";

const LINKS = [
  { label: "Email", href: `mailto:${CONTACT.email}` },
  { label: "GitHub", href: CONTACT.github, external: true },
  { label: "LinkedIn", href: CONTACT.linkedin, external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="mt-8 border-t border-line">
      <div className="mx-auto flex w-[min(1080px,92vw)] flex-wrap items-center justify-between gap-4 py-6">
        <p className="text-sm text-text-muted">
          &copy; {year} {CONTACT.name}
        </p>

        <div className="flex flex-wrap items-center gap-2.5">
          {LINKS.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.82rem] text-text-secondary transition-all hover:border-accent-border hover:text-text-primary"
              {...(external && { target: "_blank", rel: "noreferrer" })}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
