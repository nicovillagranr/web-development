import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

// 20px de margen lateral en móvil: el mínimo para que el texto no toque el borde
// de la pantalla y el pulgar no tape la primera letra al hacer scroll.
export function Container({ children, className = "" }: Props) {
  return <div className={`mx-auto w-full max-w-5xl px-5 md:px-8 ${className}`}>{children}</div>;
}
