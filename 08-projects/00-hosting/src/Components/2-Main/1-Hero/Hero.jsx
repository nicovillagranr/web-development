import { useState } from "react";

import PreviewPanel from "./PreviewPanel";
import EditorWindow from "./EditorWindow";

export default function Hero({ projects = [], profile }) {
  const [tabId, setTabId] = useState("about");

  const totalProjects = projects.length;
  const onlineCount = projects.filter((p) => p.status === "online").length;

  const data = {
    name: profile?.name || "Portfolio",
    role: profile?.role || "Frontend Developer",
    based: profile?.based || "",
    years: profile?.years ?? 0,
    projects: totalProjects,
    online: onlineCount,
    status: profile?.availability || "Cargando...",
    email: profile?.email || "",
    github: profile?.github || "",
    linkedin: profile?.linkedin || "",
    frontend: profile?.stack?.frontend ?? [],
    styling: profile?.stack?.styling ?? [],
    tools: profile?.stack?.tools ?? [],
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
        { k: "years", v: data.years, type: "num" },
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
        { k: "frontend", v: data.frontend.join(", "), type: "str" },
        { k: "styling", v: data.styling.join(", "), type: "str" },
        { k: "tools", v: data.tools.join(", "), type: "str" },
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

  return (
    <section className="pt-8 md:pt-16 lg:pt-20" id="hero">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2 lg:items-start">
        <PreviewPanel tabId={tabId} data={data} />
        <EditorWindow tab={tab} fields={tab.fields} onTabChange={setTabId} />
      </div>
    </section>
  );
}
