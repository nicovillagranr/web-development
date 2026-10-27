// Una función y no un componente: así la comparten el <a> de WhatsApp y el <a> que
// solo baja a una sección, sin que uno tenga que fingir ser el otro.
//
// El tamaño va como opción y no como clases sueltas en `extra`: si pasas `px-4`
// encima de un `px-6`, Tailwind no hace ganar a la última del string sino a la que
// salga después en el CSS generado, y eso no lo decides tú.

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "bg-surface text-ink hover:bg-surface-hover",
  inverted: "bg-white text-ink hover:bg-surface",
} as const;

// md: 48px de alto, el objetivo táctil cómodo en móvil. sm solo se usa en el header
// de escritorio, donde se apunta con ratón.
const sizes = {
  md: "min-h-12 px-6 text-[17px]",
  sm: "min-h-9 px-4 text-[14px]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
