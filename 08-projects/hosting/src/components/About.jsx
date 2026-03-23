export default function About() {
  return (
    <section id="sobre" className="py-10">
      <article className="animate-fade-up rounded-card border border-line bg-surface p-5">
        <h2 className="mb-2 font-heading text-lg font-bold text-text-primary">
          Sobre este sitio
        </h2>
        <p className="text-[0.95rem] leading-relaxed text-text-secondary">
          Este index centraliza mis proyectos desplegados en hosting. Los datos
          se cargan desde un módulo interno, así que agregar un proyecto nuevo es
          tan simple como añadir un objeto al array.
        </p>
      </article>
    </section>
  );
}
