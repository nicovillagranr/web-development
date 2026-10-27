import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  /**
   * El slug de la carpeta, literal, como en el resto de 00-portfolio (regla 4 de
   * projects-location-policy.md): se publica en public_html/landing-servicios/.
   *
   * Sin router, `./` también funcionaría; va literal para que la ruta publicada se
   * lea aquí igual que en los demás proyectos. Si cambia la carpeta de Hostinger,
   * esta línea cambia con ella, o la página carga en blanco.
   */
  base: "/landing-servicios/",
  plugins: [react(), tailwindcss()],
});
