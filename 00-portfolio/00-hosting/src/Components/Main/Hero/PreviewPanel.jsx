function KPI({ label, value, accent = "primary" }) {
  const colorMap = {
    primary: "text-text-primary",
    emerald: "text-emerald",
    amber: "text-amber",
  };
  return (
    <div>
      <div className={`font-heading text-lg font-bold ${colorMap[accent]}`}>{value}</div>
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
        {/* "X años de experiencia" junto al rol se lee como antigüedad laboral.
            El ancla de formación es concreta y comprobable, y no promete un
            historial de empleo que todavía no existe. */}
        <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-text-secondary">
          {data.based} · Programando desde 2021
        </div>
      </div>

      <p className="text-sm leading-relaxed text-text-secondary wrap-break-word">{data.bioAbout}</p>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-b border-dashed border-line-hover py-2 sm:py-3">
        <KPI label="proyectos" value={data.projects} />
        <KPI label="online" value={data.online} accent="emerald" />
        {/* Sin el `+`: afirmaba "dos o más", que es más de lo que se puede
            sostener. Y la etiqueta nombra la unidad, para que el número no se
            confunda con años cotizados. */}
        <KPI label="años en React" value={data.years} accent="amber" />
      </div>
    </div>
  );
}

function StackPillar({ label, items }) {
  return (
    <div className="min-w-0">
      <div className="font-heading text-sm font-bold text-emerald">{label}</div>
      <ul className="mt-1 flex flex-col gap-0.5 font-mono text-xs leading-relaxed text-text-muted">
        {items.map((item) => (
          <li key={item} className="break-words">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function PreviewStack({ data }) {
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
        {data.stackHeading}
      </h2>

      <p className="text-sm leading-relaxed text-text-secondary">{data.bioStack}</p>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-b border-dashed border-line-hover py-2 sm:py-3">
        {data.stackPillars.map((p) => (
          <StackPillar key={p.label} label={p.label} items={p.items} />
        ))}
      </div>

      <div className="font-mono text-xs text-text-muted">
        filosofía: <span className="text-amber">{data.philosophy}</span>
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
  // Los tres paneles se renderizan a la vez, apilados en la misma celda de grid
  // (col/row-start-1). La celda mide lo del más alto (about), así el contenedor
  // tiene altura estable y el Hero no salta al cambiar de tab. Los inactivos van
  // `invisible` (visibility:hidden): siguen ocupando espacio para el cálculo de
  // altura, pero quedan fuera de la vista, del foco y del lector de pantalla.
  const panels = [
    { id: "about", el: <PreviewAbout data={data} /> },
    { id: "stack", el: <PreviewStack data={data} /> },
    { id: "contact", el: <PreviewContact data={data} /> },
  ];

  return (
    <div className="animate-fade-up delay-2 grid min-w-0">
      {panels.map((p) => (
        <div
          key={p.id}
          role="tabpanel"
          id={`panel-${p.id}`}
          aria-labelledby={`tab-${p.id}`}
          tabIndex={0}
          className={`col-start-1 row-start-1 min-w-0 ${tabId === p.id ? "" : "invisible"}`}>
          {p.el}
        </div>
      ))}
    </div>
  );
}
