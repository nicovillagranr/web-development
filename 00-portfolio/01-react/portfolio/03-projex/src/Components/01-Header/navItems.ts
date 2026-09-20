// Definimos la forma de cada enlace del menú. Es la única fuente de esta forma:
// DesktopNav, MobileNav y NavItem la importan en vez de volver a escribirla.
export interface NavItemData {
  to: string;
  text: string;
}

// Exportamos el arreglo tipado
export const navItems: NavItemData[] = [
  { to: "/", text: "Inicio" },
  { to: "/services", text: "Servicios" },
  { to: "/portfolio", text: "Proyectos" },
  { to: "/team", text: "Equipo" },
  { to: "/news", text: "Novedades" },
  { to: "/contact", text: "Contacto" },
];
