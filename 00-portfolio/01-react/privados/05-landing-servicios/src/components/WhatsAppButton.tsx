import type { ReactNode } from "react";
import { whatsappUrl } from "../lib/whatsapp";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./ui/button";
import { WhatsAppIcon } from "./ui/icons";

type Props = {
  children: ReactNode;
  /** Mensaje que llega ya escrito al chat. Sin él, se usa el genérico de site.ts. */
  message?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function WhatsAppButton({
  children,
  message,
  variant = "cta",
  size = "md",
  className = "",
}: Props) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass(variant, size, className)}
    >
      {/* El logo avisa "esto abre WhatsApp" antes de leer el texto: "Cotizar PCs" a
          secas podría ser un formulario. En el botón blanco va en verde, como el mockup. */}
      <WhatsAppIcon
        className={`shrink-0 ${size === "sm" ? "size-4" : "size-5"} ${variant === "inverted" ? "text-whatsapp" : ""}`}
      />
      {/* El texto va en un solo <span>: suelto, cada trozo sería un ítem flex con su
          propio gap. */}
      <span>{children}</span>
    </a>
  );
}
