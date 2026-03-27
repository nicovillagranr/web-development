import BorderAnimateCard from "./components/BorderAnimateCard";

const SKILLS = [
  { title: "React", desc: "Componentes, hooks y estado" },
  { title: "CSS", desc: "Layouts, animaciones y diseño" },
  { title: "Next.js", desc: "SSR, routing y App Router" },
];

export default function App() {
  return (
    <>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
        Skills
      </h1>

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        {SKILLS.map(({ title, desc }) => (
          <BorderAnimateCard key={title}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>{title}</h2>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af", padding: "0 1rem" }}>{desc}</p>
          </BorderAnimateCard>
        ))}
      </div>
    </>
  );
}
