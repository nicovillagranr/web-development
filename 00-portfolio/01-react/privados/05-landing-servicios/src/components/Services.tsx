import { services } from "../data/services";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="bg-surface py-14 md:scroll-mt-[76px] md:py-[88px]"
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading
          id="servicios-titulo"
          eyebrow="Nuestros servicios"
          eyebrowClassName="text-soporte-strong"
          title="Elige lo que necesitas"
        >
          Tres áreas, un mismo compromiso: trabajo bien hecho, explicado en simple y con precio
          claro desde el inicio.
        </SectionHeading>

        {/* Una columna en móvil, sin carrusel: deslizar en horizontal esconde tarjetas
            que nadie llega a ver, y aquí cada una es una venta. En md la tercera ocupa
            las dos columnas, que es lo que hacía el flex-wrap del mockup a ese ancho. */}
        <ul className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id} className="md:last:odd:col-span-2 lg:last:odd:col-span-1">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
