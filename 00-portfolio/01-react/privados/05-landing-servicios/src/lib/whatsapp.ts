import { site } from "../data/site";

// encodeURIComponent y no encodeURI: el mensaje puede llevar "?", "&" o "#", que
// encodeURI deja pasar y cortarían el texto en mitad del parámetro.
export function whatsappUrl(message: string = site.defaultMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function serviceMessage(serviceName: string): string {
  return `Hola, me interesa el servicio "${serviceName}". ¿Me pueden cotizar?`;
}
