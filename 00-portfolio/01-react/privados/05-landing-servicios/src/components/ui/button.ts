// Una función y no un componente: así la comparten el <a> de WhatsApp y el <a> que
// solo baja a una sección, sin que uno tenga que fingir ser el otro.
//
// El tamaño y el peso van como opción y no como clases sueltas en `extra`: si pasas
// `px-4` encima de un `px-6`, Tailwind no hace ganar a la última del string sino a la
// que salga después en el CSS generado, y eso no lo decides tú.

const base = "inline-flex items-center justify-center gap-2 text-center transition-colors";

const variants = {
  /** El verde de WhatsApp del diseño. */
  cta: "bg-cta font-bold text-cta-ink hover:bg-cta-hover",
  /** Botón de contorno sobre el azul marino del hero. */
  ghost: "border-2 border-muted font-semibold text-white hover:border-on-dark-soft",
  /** Blanco sobre el rosa del CTA final. */
  inverted: "bg-white font-bold text-ink hover:bg-surface",
  /** Sin color: lo pone quien lo llama (las tarjetas, con el color de cada servicio). */
  plain: "font-bold",
} as const;

// md: 48px de alto en móvil, el objetivo táctil cómodo; 56px desde md, como el mockup.
// sm solo se usa en el header de escritorio, y es el único en píldora, como en el diseño.
// lg lleva px-5 en móvil y no los 32px del mockup: dentro de la tarjeta rosa, con 32px
// "Escribir por WhatsApp" se partía en dos líneas a 390px de ancho.
const sizes = {
  sm: "min-h-11 rounded-full px-5 text-[15px]",
  md: "min-h-12 rounded-xl px-6 text-[16px] md:min-h-14 md:px-7 md:text-[17px]",
  lg: "min-h-14 rounded-[14px] px-5 text-[17px] md:min-h-[60px] md:px-8 md:text-[18px]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClass(
  variant: ButtonVariant = "cta",
  size: ButtonSize = "md",
  extra = "",
): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
