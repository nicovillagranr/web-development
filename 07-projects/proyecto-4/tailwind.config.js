// ================= CONTEXTO MODULO =================
// Config central de Tailwind.
// Define fuentes, colores y tokens base reutilizados por la UI.
// tailwind.config.js
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                surface: '#27313A',
                dark: '#1F2933',
                light: '#F9FAFB',
                accent: '#22C55E',
            },
            height: {
                '800': '800px',
            },
            width: {
                '500': '500px',
            },
            fontFamily: {
                sans: ['Outfit', 'Poppins', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
};