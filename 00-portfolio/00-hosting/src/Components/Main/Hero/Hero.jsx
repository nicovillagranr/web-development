import { useState } from "react";

import PreviewPanel from "./PreviewPanel";
import EditorWindow from "./EditorWindow";
import HeroSkeleton from "./HeroSkeleton";

export default function Hero({ projects = [], profile, loading = false }) {
  const [tabId, setTabId] = useState("about");

  const totalProjects = projects.length;
  const onlineCount = projects.filter((p) => p.status === "online").length;

  // Fallbacks "honestos": ante fallo de la API muestran "—" en vez de datos
  // plausibles, para que el hueco delate el fallo y no lo disimule.
  // Los `?? []` no son cosméticos: evitan que `.join()` crashee el render.
  const data = {
    name: profile?.name || "—",
    role: profile?.role || "—",
    based: profile?.based || "—",
    years: profile?.years ?? "—",
    projects: totalProjects,
    online: onlineCount,
    status: profile?.availability || "—",
    email: profile?.email || "nicovillagranroses@gmail.com",
    github: profile?.github || "https://github.com/nicovillagranr",
    linkedin: profile?.linkedin || "https://www.linkedin.com/in/nico-villagran/",
    languages: profile?.stack?.languages ?? [],
    frontend: profile?.stack?.frontend ?? [],
    styling: profile?.stack?.styling ?? [],
    testing: profile?.stack?.testing ?? [],
    tools: profile?.stack?.tools ?? [],
    copilots: profile?.stack?.copilots ?? [],
    bioAbout: profile?.intro?.about || "—",
    bioStack: profile?.intro?.stack || "—",
    stackHeading: profile?.intro?.stackHeading || "—",
    stackPillars: profile?.intro?.stackPillars ?? [],
    philosophy: profile?.philosophy || "—",
  };

  const TABS = [
    {
      id: "about",
      name: "about.json",
      icon: "👤",
      fields: [
        { k: "name", v: data.name, type: "str" },
        { k: "role", v: data.role, type: "str" },
        { k: "based", v: data.based, type: "str" },
        { k: "years_react", v: data.years, type: "num" },
        { k: "projects", v: data.projects, type: "num" },
        { k: "online", v: data.online, type: "num" },
        { k: "status", v: data.status, type: "str" },
      ],
    },
    {
      id: "stack",
      name: "stack.json",
      icon: "⚡",
      fields: [
        { k: "languages", v: data.languages, type: "arr" },
        { k: "frontend", v: data.frontend, type: "arr" },
        { k: "styling", v: data.styling, type: "arr" },
        { k: "testing", v: data.testing, type: "arr" },
        { k: "tools", v: data.tools, type: "arr" },
        { k: "copilots", v: data.copilots, type: "arr" },
      ],
    },
    {
      id: "contact",
      name: "contact.json",
      icon: "✉",
      fields: [
        { k: "email", v: data.email, type: "str" },
        { k: "github", v: data.github, type: "str" },
        { k: "linkedin", v: data.linkedin, type: "str" },
      ],
    },
  ];

  const tab = TABS.find((t) => t.id === tabId);

  if (loading) return <HeroSkeleton />;

  return (
    <section className="pt-8 md:pt-16 lg:pt-20" id="hero">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 md:grid-cols-[2fr_3fr] md:items-start">
        <PreviewPanel tabId={tabId} data={data} />
        <EditorWindow tab={tab} fields={tab.fields} onTabChange={setTabId} />
      </div>
    </section>
  );
}
