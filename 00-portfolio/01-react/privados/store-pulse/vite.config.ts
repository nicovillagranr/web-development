/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  /**
   * El subdirectorio desde el que se sirve la app en el hosting.
   *
   * Sin esto, Vite escribe rutas absolutas desde la raíz del dominio
   * (`/assets/index-abc.js`). Publicado en un subdirectorio, el navegador pide ese
   * archivo a la raíz, no lo encuentra, y el módulo nunca llega a ejecutarse: el
   * HTML carga, `#root` se queda vacío y sale una **pantalla en blanco sin error
   * visible**. Es el fallo más silencioso del despliegue estático, porque en `pnpm
   * dev` y en `pnpm preview` todo funciona — ahí la app sí vive en la raíz.
   *
   * Tiene que coincidir exactamente con la carpeta publicada, con las dos barras.
   * `App.tsx` lo reutiliza como `basename` del router vía `import.meta.env.BASE_URL`,
   * así que cambiando esta línea se enteran los dos.
   */
  base: "/store-pulse/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // La app se actualiza sola en cuanto hay una versión nueva. Es lo correcto
      // aquí: nadie va a pulsar un botón de "actualizar" en una app que abre treinta
      // segundos antes de empezar un turno.
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Store Pulse — métricas del local",
        short_name: "Store Pulse",
        description:
          "Métricas operativas del local: rendimiento individual y de equipo, objetivos y evolución semanal.",
        lang: "es-CL",
        start_url: ".",
        scope: ".",
        // standalone es lo que hace que, una vez instalada, se abra sin barra de
        // direcciones y se comporte como una app y no como una pestaña.
        display: "standalone",
        orientation: "portrait",
        background_color: "#f1f5f9",
        theme_color: "#4f46e5",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          {
            // "maskable" deja que Android recorte el icono a la forma del sistema
            // (círculo, cuadrado redondeado, gota) sin comerse el dibujo. Sin una
            // versión maskable, el icono sale metido en un cuadrado blanco.
            src: "icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        runtimeCaching: [
          {
            /**
             * Preparado para cuando exista la API (Fase 7).
             *
             * `NetworkFirst`: se intenta la red y, si falla o tarda más de 5 s, se
             * sirve lo último que se guardó. Es la versión en runtime de lo que ya
             * hace tu portfolio con el snapshot de build time — antes que una
             * pantalla en blanco, el último estado conocido.
             *
             * Y por eso la cabecera de frescura no es un adorno: con esta estrategia
             * la app puede estar enseñando datos de hace una semana con toda
             * normalidad, así que tiene que decir de cuándo son.
             */
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst",
            options: {
              cacheName: "store-pulse-api",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        // Sin esto el service worker solo existe en build, y los fallos de caché se
        // descubren en producción. Con esto se puede probar el modo offline en dev.
        enabled: true,
        type: "module",
      },
    }),
  ],
  test: {
    // Node por defecto, no jsdom. Los tests de src/metrics/ son funciones puras y
    // levantar un DOM para ellos costaba ~2 min de arranque. Los tests de componentes
    // piden su entorno con un comentario en la primera línea del archivo:
    //
    //   // @vitest-environment jsdom
    //
    environment: "node",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
