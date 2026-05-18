import { useState, useEffect } from "react";

export default function EditorWindow({ tab, fields, onTabChange }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevTabId, setPrevTabId] = useState(tab.id);

  // Reset activeIdx cuando cambia la tab (patrón "adjust state during render" de React docs)
  if (prevTabId !== tab.id) {
    setPrevTabId(tab.id);
    setActiveIdx(0);
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % fields.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [fields.length]);

  const TAB_ITEMS = [
    { id: "about", name: "about.json", icon: "👤" },
    { id: "stack", name: "stack.json", icon: "⚡" },
    { id: "contact", name: "contact.json", icon: "✉" },
  ];

  const handleTabKey = (e, currentId) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const idx = TAB_ITEMS.findIndex((item) => item.id === currentId);
    const nextIdx =
      e.key === "ArrowRight"
        ? (idx + 1) % TAB_ITEMS.length
        : (idx - 1 + TAB_ITEMS.length) % TAB_ITEMS.length;
    const nextId = TAB_ITEMS[nextIdx].id;
    onTabChange(nextId);
    document.getElementById(`tab-${nextId}`)?.focus();
  };

  return (
    <div className="animate-fade-up delay-2 flex flex-col rounded-lg border border-line bg-surface/60 backdrop-blur overflow-hidden max-h-96 sm:max-h-full">
      {/* Title bar + Tabs */}
      <div className="flex items-center border-b border-line overflow-x-auto">
        <div className="flex flex-1 sm:overflow-x-auto" role="tablist" aria-label="Secciones del perfil">
          {TAB_ITEMS.map((t) => (
            <button
              role="tab"
              aria-selected={tab.id === t.id}
              id={`tab-${t.id}`}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab.id === t.id ? 0 : -1}
              key={t.id}
              onClick={() => onTabChange(t.id)}
              onKeyDown={(e) => handleTabKey(e, t.id)}
              className={`relative overflow-hidden px-2 py-2 sm:px-3 sm:py-3 border-t-2 border-r border-r-line border-b border-b-transparent text-xs font-mono transition-colors whitespace-nowrap flex-1 text-center sm:flex-none sm:text-left ${tab.id === t.id ? "border-t-accent bg-accent/10 text-text-primary" : "border-t-transparent text-text-muted hover:text-text-secondary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"}`}>
              {tab.id !== t.id && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 -translate-x-1/2 animate-bounce text-sm sm:text-base leading-none text-accent motion-reduce:animate-none">
                  ▾
                </span>
              )}
              <span className="mr-0.5 sm:mr-1">{t.icon}</span>
              <span className="hidden sm:inline font-semibold">{t.name}</span>
              <span className="sm:hidden text-xs">{t.id}</span>
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 text-xs font-mono text-emerald mr-4 py-2 sm:py-3 px-1 sm:px-0 shrink-0 hidden sm:flex">
          <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald animate-pulse-dot" />
          <span className="">editing</span>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Line Numbers */}
        <div className="flex flex-col border-r border-line bg-base-900/50 px-1 sm:px-3 py-2 sm:py-4 text-right font-mono text-xs text-text-muted/40 select-none shrink-0">
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
                <span className={f.type === "num" ? "text-emerald" : "text-amber"}>
                  {f.type === "str" ? `"${f.v}"` : f.v}
                </span>
                <span className="text-text-secondary">{i < fields.length - 1 ? "," : ""}</span>
                {isActive && <span className="animate-blink text-accent">|</span>}
              </span>
            );
          })}
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
