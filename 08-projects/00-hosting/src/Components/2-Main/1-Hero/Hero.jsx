import { useState, useEffect, useMemo } from "react";
import { CONTACT } from "@/data/contact";

function KPI({ label, value, accent = "primary" }) {
  const colorMap = {
    primary: "text-text-primary",
    cyan: "text-emerald",
    amber: "text-amber",
  };
  return (
    <div>
      <div className={`font-heading text-2xl font-bold ${colorMap[accent]}`}>{value}</div>
      <div className="font-mono text-xs uppercase tracking-widest text-text-muted">{label}</div>
    </div>
  );
}

function PreviewAbout({ data, pulse }) {
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
        <KPI label="online" value={data.online} accent="cyan" />
        <KPI label="años" value={`${data.years}+`} accent="amber" />
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
    { label: "frontend", items: data.frontend.split(","), color: "accent" },
    { label: "styling", items: data.styling.split(","), color: "emerald" },
    { label: "backend", items: data.backend.split(","), color: "amber" },
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
        Lo que <span className="bg-gradient-to-r from-accent via-emerald to-amber bg-clip-text text-transparent">construyo</span>
      </h2>

      <div className="flex flex-col gap-2 sm:gap-4">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="font-mono text-xs text-text-muted mb-1">$ {g.label}</div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {g.items.map((s) => (
                <span key={s} className={`rounded-badge border px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-xs ${colorMap[g.color]}`}>
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-xs text-text-muted">
        learning: <span className="text-amber">TS patterns</span>
      </div>
    </div>
  );
}

function PreviewContact({ data }) {
  const channels = [
    { icon: "✉", label: "email", value: data.email, href: `mailto:${data.email}`, accent: "accent" },
    { icon: "⌬", label: "github", value: data.github, href: `https://${data.github}`, accent: "emerald" },
    { icon: "⎘", label: "linkedin", value: data.linkedin, href: `https://linkedin.com/${data.linkedin}`, accent: "amber" },
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
          &lt;6h
        </span>
        <span className="font-mono text-xs text-text-muted hidden sm:inline">ContactCard.tsx</span>
      </div>

      <h2 className="font-heading text-2xl sm:text-4xl font-bold leading-tight text-text-primary">
        Hablemos. <span className="text-emerald">Santiago</span>
      </h2>

      <div className="flex flex-col gap-2">
        {channels.map((c) => (
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 sm:gap-3 rounded-lg border px-2 sm:px-4 py-2 sm:py-3 transition-colors hover:opacity-80 ${colorMap[c.accent]}`}>
            <span className="text-base sm:text-lg flex-shrink-0">{c.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs uppercase tracking-widest text-current opacity-70">{c.label}</div>
              <div className="font-mono text-xs sm:text-sm text-current truncate">{c.value}</div>
            </div>
            <span className="text-base sm:text-lg opacity-50 flex-shrink-0">→</span>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-dashed border-line-hover pt-3 sm:pt-4">
        <span className="font-mono text-xs text-text-muted">pref:</span>
        {["email", "whatsapp"].map((p) => (
          <span key={p} className="rounded-badge border border-line-hover px-2 py-0.5 font-mono text-xs text-text-secondary">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function EditorWindow({ tab, fields, activeIdx, onTabChange }) {
  return (
    <div className="animate-fade-up delay-2 flex flex-col rounded-card border border-line bg-surface/60 backdrop-blur overflow-hidden max-h-96 sm:max-h-full">
      {/* Traffic + Tabs */}
      <div className="flex items-center border-b border-line px-2 sm:px-4 gap-1 overflow-x-auto">
        <div className="flex gap-1 py-2 pr-2 flex-shrink-0 sm:gap-1.5 sm:py-3 sm:pr-4">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-accent/50" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber/50" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald/50" />
        </div>

        <div className="flex overflow-x-auto">
          {[
            { id: "about", name: "about.json", icon: "👤" },
            { id: "stack", name: "stack.json", icon: "⚡" },
            { id: "contact", name: "contact.json", icon: "✉" },
          ].map((t) => (
            <button key={t.id} onClick={() => onTabChange(t.id)} className={`px-2 py-2 sm:px-3 sm:py-3 border-t-2 border-b border-b-transparent text-xs font-mono transition-colors whitespace-nowrap flex-shrink-0 ${tab.id === t.id ? "border-t-accent bg-accent/10 text-text-primary" : "border-t-transparent text-text-muted hover:text-text-secondary"}`}>
              <span className="mr-0.5 sm:mr-1">{t.icon}</span>
              <span className="hidden sm:inline">{t.name}</span>
              <span className="sm:hidden text-xs">{t.id}</span>
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 text-xs font-mono text-emerald py-2 sm:py-3 px-1 sm:px-0 flex-shrink-0">
          <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald animate-pulse-dot" />
          <span className="hidden sm:inline">editing</span>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Line Numbers */}
        <div className="flex flex-col border-r border-line bg-base-900/50 px-1 sm:px-3 py-2 sm:py-4 text-right font-mono text-xs text-text-muted/40 select-none flex-shrink-0">
          {Array.from({ length: fields.length + 2 }).map((_, i) => (
            <div key={i} className="h-5 sm:h-7">{i + 1}</div>
          ))}
        </div>

        {/* Code */}
        <pre className="flex-1 overflow-auto p-2 sm:p-4 font-mono text-xs sm:text-sm leading-5 sm:leading-7 text-text-secondary">
          <span className="text-text-secondary">{"{"}</span>
          {"\n"}
          {fields.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <span key={f.k} className={`block px-1 sm:px-2 -mx-1 sm:-mx-2 rounded transition-colors ${isActive ? "bg-accent/10 border-l-2 border-accent" : ""}`}>
                <span className="hidden sm:inline">{"  "}</span>
                <span className="text-text-primary">"{f.k}"</span>
                <span className="text-text-secondary">:</span>
                <span className={f.type === "num" ? "text-emerald" : "text-amber"}>{f.v}</span>
                <span className="text-text-secondary">{i < fields.length - 1 ? "," : ""}</span>
                {isActive && <span className="animate-blink text-accent">|</span>}
              </span>
            );
          })}
          {"\n"}
          <span className="text-text-secondary">{"}"}</span>
        </pre>
      </div>

      {/* Status Bar - Hidden on mobile */}
      <div className="hidden sm:flex items-center gap-3 border-t border-line bg-accent/5 px-4 py-2 text-xs font-mono text-text-muted">
        <span className="text-accent">⎇ main</span>
        <span>● clean</span>
        <span className="ml-auto">JSON</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>{tab.name}</span>
        <span className="text-emerald">0 errors</span>
      </div>
    </div>
  );
}

export default function Hero({ projects = [] }) {
  const [tabId, setTabId] = useState("about");
  const [activeIdx, setActiveIdx] = useState(0);
  const [pulse, setPulse] = useState(0);

  const totalProjects = projects.length;
  const onlineCount = useMemo(() => projects.filter((p) => p.status === "online").length, [projects]);

  const TABS = [
    {
      id: "about",
      name: "about.json",
      icon: "👤",
      fields: [
        { k: "name", v: "Nico Villagrán", type: "str" },
        { k: "role", v: "Frontend Developer", type: "str" },
        { k: "based", v: "Santiago, CL", type: "str" },
        { k: "years", v: "2", type: "num" },
        { k: "projects", v: totalProjects, type: "num" },
        { k: "online", v: onlineCount, type: "num" },
        { k: "status", v: "open_to_work", type: "str" },
      ],
    },
    {
      id: "stack",
      name: "stack.json",
      icon: "⚡",
      fields: [
        { k: "frontend", v: "React 19, Next.js, TypeScript", type: "str" },
        { k: "styling", v: "Tailwind v4, Framer Motion", type: "str" },
        { k: "backend", v: "Node.js, Supabase", type: "str" },
      ],
    },
    {
      id: "contact",
      name: "contact.json",
      icon: "✉",
      fields: [
        { k: "email", v: CONTACT.email, type: "str" },
        { k: "github", v: "github.com/nicovillagranr", type: "str" },
        { k: "linkedin", v: "in/nico-villagran", type: "str" },
      ],
    },
  ];

  const tab = TABS.find((t) => t.id === tabId);

  useEffect(() => {
    setActiveIdx(0);
    setPulse((p) => p + 1);

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % tab.fields.length);
      setPulse((p) => p + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [tabId, tab.fields.length]);

  const data = {
    name: "Nico Villagrán",
    role: "Frontend Developer",
    based: "Santiago, CL",
    years: "2",
    projects: totalProjects,
    online: onlineCount,
    status: "open_to_work",
    email: CONTACT.email,
    github: "github.com/nicovillagranr",
    linkedin: "in/nico-villagran",
    frontend: "React 19, Next.js, TypeScript",
    styling: "Tailwind v4, Framer Motion",
    backend: "Node.js, Supabase",
  };

  return (
    <section className="pt-8 md:pt-16 lg:pt-20" id="hero">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2 lg:items-start">
        <EditorWindow tab={tab} fields={tab.fields} activeIdx={activeIdx} onTabChange={setTabId} />

        <div key={tabId} className="animate-fade-up delay-2">
          {tabId === "about" && <PreviewAbout data={data} pulse={pulse} />}
          {tabId === "stack" && <PreviewStack data={data} />}
          {tabId === "contact" && <PreviewContact data={data} />}
        </div>
      </div>
    </section>
  );
}
