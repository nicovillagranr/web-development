import type { ReactNode } from "react";

// Los anchos del mockup (1200, 1100 y 820px de contenido) más los 48px del padding
// lateral de escritorio, para que el texto quede exactamente donde lo pone el diseño.
const widths = {
  wide: "max-w-[1248px]",
  medium: "max-w-[1148px]",
  narrow: "max-w-[868px]",
} as const;

type Props = { children: ReactNode; width?: keyof typeof widths; className?: string };

// 20px de margen lateral en móvil: el mínimo para que el texto no toque el borde
// de la pantalla y el pulgar no tape la primera letra al hacer scroll.
export function Container({ children, width = "wide", className = "" }: Props) {
  return (
    <div className={`mx-auto w-full px-5 md:px-6 ${widths[width]} ${className}`}>{children}</div>
  );
}
