function KPI({ label, value, accent = "primary" }) {
  const colorMap = {
    primary: "text-text-primary",
    emerald: "text-emerald",
    amber: "text-amber",
  };
  return (
    <div>
      <div className={`font-heading text-2xl font-bold ${colorMap[accent]}`}>{value}</div>
      <div className="font-mono text-xs uppercase tracking-widest text-text-muted">{label}</div>
    </div>
  );
}

function PreviewAbout({ data }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-badge border border-accent-border bg-accent-glow px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-semibold text-accent">
          <span className="animate-pulse-dot inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-accent" />
          {data.status}
        </span>
        <span className="font-mono text-xs text-text-muted hidden sm:inline">ProfileCard.tsx</span>
      </div>

      <div>
        <div className="font-mono text-xs text-text-muted mb-1">{data.role}</div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-text-primary">
          {data.name}
        </h2>
        <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-text-secondary">
          {data.based} · {data.years} años de experiencia
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-b border-dashed border-line-hover py-3 sm:py-4">
        <KPI label="proyectos" value={data.projects} />
        <KPI label="online" value={data.online} accent="emerald" />
        <KPI label="años" value={data.years === "—" ? "—" : `${data.years}+`} accent="amber" />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <a href="#proyectos" className="hero-cta-shadow rounded-btn bg-linear-to-br from-accent to-cyan-400 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-base-900 transition-transform hover:-translate-y-0.5 sm:flex-1 text-center">
          Trabajemos juntos
        </a>
        <a href="#proyectos" className="rounded-btn border border-line-hover bg-base-900/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-text-primary transition-all hover:-translate-y-0.5 hover:border-accent-border sm:flex-1 text-center">
          Ver proyectos
        </a>
      </div>
    </div>
  );
}

function PreviewStack({ data }) {
  const groups = [
    { label: "frontend", items: data.frontend, color: "accent" },
    { label: "styling", items: data.styling, color: "emerald" },
    { label: "tools", items: data.tools, color: "amber" },
  ];

  const colorMap = {
    accent: "border-accent-border bg-accent-glow text-accent",
    emerald: "border-emerald bg-emerald-glow text-emerald",
    amber: "border-amber bg-amber-glow text-amber",
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-badge border border-emerald bg-emerald-glow px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-semibold text-emerald">
          <span className="animate-pulse-dot inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald" />
          stack
        </span>
        <span className="font-mono text-xs text-text-muted hidden sm:inline">StackCard.tsx</span>
      </div>

      <h2 className="font-heading text-2xl sm:text-4xl font-bold leading-tight text-text-primary">
        Lo que <span className="bg-linear-to-r from-accent via-emerald to-amber bg-clip-text text-transparent">construyo</span>
      </h2>

      <div className="flex flex-col gap-2 sm:gap-4">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="font-mono text-xs text-text-muted mb-1">$ {g.label}</div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {g.items.map((s) => (
                <span key={s} className={`rounded-badge border px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-xs ${colorMap[g.color]}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-xs text-text-muted">
        filosofía: <span className="text-amber">Nunca dejar de aprender</span>
      </div>
    </div>
  );
}

function PreviewContact({ data }) {
  const channels = [
    { icon: "✉", label: "email", value: data.email, href: `mailto:${data.email}`, accent: "accent" },
    { icon: "⌬", label: "github", value: data.github, href: data.github, accent: "emerald" },
    { icon: "⎘", label: "linkedin", value: data.linkedin, href: data.linkedin, accent: "amber" },
  ];

  const colorMap = {
    accent: "border-accent-border bg-accent-glow text-accent",
    emerald: "border-emerald bg-emerald-glow text-emerald",
    amber: "border-amber bg-amber-glow text-amber",
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-badge border border-accent-border bg-accent-glow px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-semibold text-accent">
          <span className="animate-pulse-dot inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-accent" />
          Seeking opportunities
        </span>
        <span className="font-mono text-xs text-text-muted hidden sm:inline">ContactCard.tsx</span>
      </div>

      <h2 className="font-heading text-2xl sm:text-4xl font-bold leading-tight text-text-primary">
        Construyamos <span className="text-emerald">algo juntos</span>
      </h2>

      <div className="flex flex-col gap-2">
        {channels.map((c) => (
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 sm:gap-3 rounded-lg border px-2 sm:px-4 py-2 sm:py-3 transition-colors hover:opacity-80 ${colorMap[c.accent]}`}>
            <span className="text-base sm:text-lg shrink-0">{c.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs uppercase tracking-widest text-current opacity-70">{c.label}</div>
              <div className="font-mono text-xs sm:text-sm text-current truncate">{c.value}</div>
            </div>
            <span className="text-base sm:text-lg opacity-50 shrink-0">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function PreviewPanel({ tabId, data }) {
  return (
    <div
      key={tabId}
      role="tabpanel"
      id={`panel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      tabIndex={0}
      className="animate-fade-up delay-2 h-75 md:h-100 overflow-y-auto">
      {tabId === "about" && <PreviewAbout data={data} />}
      {tabId === "stack" && <PreviewStack data={data} />}
      {tabId === "contact" && <PreviewContact data={data} />}
    </div>
  );
}
