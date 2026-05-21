import { Fragment, useState, useEffect } from "react";

// Una línea del editor: número + contenido en la misma fila flex, así ambos
// crecen juntos cuando el contenido envuelve (un número por línea lógica,
// como un editor con soft-wrap). El gutter de las filas apiladas forma la
// columna continua (bg + borde derecho).
function CodeLine({ n, active = false, children }) {
  return (
    <div className="flex">
      <span className="hidden sm:block shrink-0 w-8 sm:w-12 select-none border-r border-line bg-base-900/50 sm:px-3 text-right text-xs text-text-muted/40">
        {n}
      </span>
      {/* border-l-2 siempre presente (transparente si no está activa) para que
          la línea activa no desplace el texto 2px al ciclar. text-indent
          negativo + padding = sangría colgante: las líneas envueltas quedan
          indentadas bajo el valor, no pegadas al gutter. */}
      <span
        className={`flex-1 whitespace-pre-wrap wrap-break-word border-l-2 pr-2 sm:pr-4 pl-[2.5em] indent-[-2em] ${active ? "border-accent bg-accent/10" : "border-transparent"}`}>
        {children}
      </span>
    </div>
  );
}

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
    <div className="animate-fade-up delay-2 flex flex-col min-w-0 rounded-lg border border-line bg-surface/60 backdrop-blur overflow-hidden  sm:max-h-full">
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

      {/* Editor Body — cada línea es una fila [número][contenido] */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 font-mono text-xs sm:text-sm leading-5 sm:leading-7 text-text-secondary">
        <CodeLine n={1}>
          <span className="text-text-secondary">{"{"}</span>
        </CodeLine>

        {(() => {
          // Cuántas líneas ocupa un campo: los `arr` van en dos ("clave": en
          // una, el array en la siguiente); el resto en una sola.
          const span = (f) => (f.type === "arr" ? 2 : 1);
          // Línea numerada donde empieza cada campo (la línea 1 es "{").
          const lineStarts = fields.map(
            (_, i) => 2 + fields.slice(0, i).reduce((sum, ff) => sum + span(ff), 0),
          );
          const closingLine = 2 + fields.reduce((sum, ff) => sum + span(ff), 0);

          return (
            <>
              {fields.map((f, i) => {
                const isActive = i === activeIdx;
                const isLast = i === fields.length - 1;
                const n = lineStarts[i];

                // Campo array: la clave en su línea y el array en la siguiente.
                if (f.type === "arr") {
                  return (
                    <Fragment key={f.k}>
                      <CodeLine n={n} active={isActive}>
                        <span className="hidden sm:inline">{"  "}</span>
                        <span className="text-text-primary">"{f.k}"</span>
                        <span className="text-text-secondary">:</span>
                      </CodeLine>
                      <CodeLine n={n + 1} active={isActive}>
                        <span className="hidden sm:inline">{"  "}</span>
                        <span className="text-text-secondary">[</span>
                        {/* Cada tecnología + su coma van juntas en un span
                            nowrap, así "React Router" nunca se parte. El espacio
                            que sigue queda suelto: ahí envuelve la línea. */}
                        {f.v.map((item, j) => (
                          <span key={item}>
                            <span className="whitespace-nowrap">
                              <span className="text-amber">"{item}"</span>
                              {j < f.v.length - 1 && <span className="text-text-secondary">,</span>}
                            </span>
                            {j < f.v.length - 1 ? " " : ""}
                          </span>
                        ))}
                        <span className="text-text-secondary">]</span>
                        <span className="text-text-secondary">{isLast ? "" : ","}</span>
                        {isActive && <span className="animate-blink text-accent">|</span>}
                      </CodeLine>
                    </Fragment>
                  );
                }

                return (
                  <CodeLine key={f.k} n={n} active={isActive}>
                    <span className="hidden sm:inline">{"  "}</span>
                    <span className="text-text-primary">"{f.k}"</span>
                    <span className="text-text-secondary">: </span>
                    <span className={f.type === "num" ? "text-emerald" : "text-amber"}>
                      {f.type === "str" ? `"${f.v}"` : f.v}
                    </span>
                    <span className="text-text-secondary">{isLast ? "" : ","}</span>
                    {isActive && <span className="animate-blink text-accent">|</span>}
                  </CodeLine>
                );
              })}

              <CodeLine n={closingLine}>
                <span className="text-text-secondary">{"}"}</span>
              </CodeLine>
            </>
          );
        })()}
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
