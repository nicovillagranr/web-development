import type { ComponentType } from "react";
import type { Tone } from "../../data/tone";
import { BrowserCodeIcon, CubeIcon, MonitorIcon, SupportIcon } from "./icons";

type ToneStyle = {
  /** Fondo de color con su texto: cabecera de tarjeta, mosaico del hero, número del paso. */
  solid: string;
  /** Texto secundario sobre `solid` (el subtítulo de la tarjeta, la línea del mosaico). */
  solidMuted: string;
  /** Fondo claro de los pasos de "Cómo funciona". */
  soft: string;
  /** Color del ✓ en la lista blanca de la tarjeta. */
  check: string;
  /** Botón de la tarjeta. */
  button: string;
  Icon: ComponentType<{ className?: string }>;
};

// Clases escritas enteras y no armadas con `bg-${tone}`: Tailwind busca las clases
// como texto en el código, y una que solo existe al ejecutarse no llega al CSS.
//
// Record con la unión como clave: si mañana tone.ts añade un color y aquí nadie lo
// pinta, el typecheck falla en esta línea en vez de dejar una tarjeta sin fondo.
export const tones: Record<Tone, ToneStyle> = {
  pc: {
    solid: "bg-pc text-white",
    solidMuted: "text-pc-soft",
    soft: "bg-pc-soft",
    check: "text-pc",
    button: "bg-pc text-white hover:bg-pc-hover",
    Icon: MonitorIcon,
  },
  web: {
    solid: "bg-web text-web-ink",
    solidMuted: "",
    soft: "bg-web-soft",
    check: "text-web-strong",
    button: "bg-web text-web-ink hover:bg-web-light",
    Icon: BrowserCodeIcon,
  },
  cad: {
    solid: "bg-cad text-cad-ink",
    solidMuted: "",
    soft: "bg-cad-soft",
    check: "text-cad-strong",
    button: "bg-cad text-cad-ink hover:bg-cad-light",
    Icon: CubeIcon,
  },
  soporte: {
    solid: "bg-soporte text-white",
    solidMuted: "",
    soft: "bg-soporte-soft",
    check: "text-soporte-strong",
    button: "bg-soporte text-white hover:bg-soporte-strong",
    Icon: SupportIcon,
  },
};
