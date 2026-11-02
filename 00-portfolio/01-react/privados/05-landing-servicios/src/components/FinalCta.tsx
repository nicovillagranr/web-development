import { contact } from "../data/site";
import { formatPhone } from "../lib/format";
import { Container } from "./ui/Container";
import { WhatsAppButton } from "./WhatsAppButton";

export function FinalCta() {
  return (
    <section
      id="contacto"
      aria-labelledby="cta-titulo"
      className="bg-navy py-14 md:scroll-mt-[76px] md:py-[88px]"
    >
      <Container width="medium">
        <div className="flex flex-col gap-8 rounded-3xl bg-soporte p-7 text-white sm:p-10 md:rounded-[32px] lg:flex-row lg:items-center lg:justify-between lg:p-16">
          <div className="flex flex-col gap-3.5">
            <h2
              id="cta-titulo"
              className="font-display text-[30px] leading-[1.1] font-bold text-balance md:text-[36px] lg:text-[44px]"
            >
              ¿Listo para empezar?
            </h2>
            <p className="text-[17px] leading-[1.6] md:text-[18px]">
              Escríbenos hoy y recibe tu cotización sin costo. Respondemos en el día.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 lg:flex-none">
            <WhatsAppButton variant="inverted" size="lg" className="w-full">
              Escribir por WhatsApp
            </WhatsAppButton>
            <p className="text-center text-[14px]">
              {formatPhone(contact.whatsappNumber)}
              {contact.email && (
                <>
                  {" · "}
                  <a href={`mailto:${contact.email}`} className="underline underline-offset-2">
                    {contact.email}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
