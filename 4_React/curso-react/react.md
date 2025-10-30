<!-- # 🚀 Iniciar un proyecto con React + Vite -->

<!-- ## 1️⃣ Crear el proyecto -->
<!-- Ejecuta en la terminal: -->

<!-- bash -->
<!-- npm create vite@latest mi-proyecto -->

<!-- Durante el asistente, selecciona: -->
<!-- Framework: React -->
<!-- Variant: JavaScript o TypeScript (elige según tu preferencia) -->

<!-- Entrar al proyecto -->
<!-- cd mi-proyecto -->

<!-- Instala las dependencias: -->
<!-- npm install -->

<!-- Inicia el servidor de desarrollo: -->
<!-- npm run dev -->

<!-- Tu app estará corriendo (por defecto) en: -->
<!-- 👉 http://localhost:5173 -->

<!-- 3️⃣ Producción (opcional, pero importante) -->
<!-- Cuando tu app esté lista para subir a un hosting: -->
<!-- npm run build -->

<!-- Esto generará una carpeta dist con los archivos optimizados para producción. -->

<!-- Para correr el servidor de producción: -->
<!-- npm run preview

⚙️ Tipos de React según la plataforma
React no es solo para sitios web. Dependiendo del entorno donde quieras desplegar tu app, existen distintas variantes:

🖥️ React (Web)
Uso: Desarrollo de interfaces web (sitios, dashboards, portfolios, etc.)
Base: HTML, CSS y JavaScript.
Herramientas comunes: Vite, Next.js, Astro, Remix.
Salida final: Archivos estáticos que corren en el navegador.

📱 React Native (Móvil)
Uso: Creación de apps móviles nativas (iOS y Android) con JavaScript.
Base: Usa componentes nativos (no HTML) como <View>, <Text>, <Image>.
Herramientas comunes: Expo, React Native CLI.
Salida final: Aplicaciones nativas compiladas (.apk / .ipa).

🧩 React Native for Windows + macOS (Escritorio)
Uso: Desarrollo de aplicaciones de escritorio con React Native.
Base: Misma lógica que React Native, adaptada a las APIs de escritorio.
Herramientas comunes: react-native-windows, react-native-macos.
Salida final: Apps ejecutables para Windows o macOS.

💻 React + Electron (Escritorio con Web)
Uso: Crear aplicaciones de escritorio usando tecnologías web (HTML, CSS, JS).
Base: Usa React dentro de un contenedor de navegador (Chromium) con Node.js.
Herramientas comunes: Electron, Vite, React.
Salida final: Apps multiplataforma (Windows, macOS, Linux).

🧠 Notas rápidas

create-react-app → Antiguo y lento. Evítalo.
Vite → Moderno, veloz y ampliamente adoptado.
npm run dev → Modo desarrollo con recarga instantánea.
npm run build → Compila tu app para producción.

⚡ En resumen
React es una biblioteca para construir interfaces, y puedes usarla en cualquier plataforma:
🌐 Web → React tradicional con Vite o Next.js.
📱 Móvil → React Native / Expo.
🧩 Escritorio → React Native for Windows/macOS o React + Electron.
