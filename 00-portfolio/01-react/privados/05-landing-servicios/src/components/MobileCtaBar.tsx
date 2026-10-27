import { WhatsAppButton } from "./WhatsAppButton";

// La pieza central del mobile-first: el CTA vive abajo porque es donde llega el
// pulgar con el teléfono en una mano, y no se va al hacer scroll.
//
// El padding inferior usa max(): en un Android sin barra de gestos el inset vale 0 y
// quedan 12px; en un iPhone vale ~34px y el botón sube por encima de la barra.
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-canvas/80 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-1px_0_rgb(0_0_0/0.06)] backdrop-blur-xl md:hidden">
      <WhatsAppButton className="w-full">Escríbenos por WhatsApp</WhatsAppButton>
    </div>
  );
}
