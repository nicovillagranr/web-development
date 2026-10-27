import { services } from "../data/services";
import { Container } from "./ui/Container";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="bg-surface py-16 md:scroll-mt-14 md:py-24"
    >
      <Container>
        <h2
          id="servicios-titulo"
          className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[48px]"
        >
          Servicios
        </h2>
        <p className="mt-3 max-w-xl text-[17px] leading-[1.5] text-muted md:text-[19px]">
          Elige uno y escríbenos: el chat se abre con un mensaje ya escrito que nombra ese servicio.
        </p>

        {/* Una columna en móvil, sin carrusel: deslizar en horizontal esconde tarjetas
            que nadie llega a ver, y aquí cada una es una venta. */}
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
