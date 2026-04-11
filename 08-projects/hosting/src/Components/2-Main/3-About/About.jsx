import "./About.css";

export default function About() {
  return (
    <section id="sobre" className="mt-16">
      <article className="about">
        <h2 className="about__title">Sobre este sitio</h2>
        <p className="about__description">
          Este index centraliza mis proyectos desplegados en hosting. Los datos
          se cargan desde un módulo interno, así que agregar un proyecto nuevo es
          tan simple como añadir un objeto al array.
        </p>
      </article>
    </section>
  );
}