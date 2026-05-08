// ================= CONTEXTO MODULO =================
// Config central de Tailwind.
// Define fuentes, colores y tokens base reutilizados por la UI.
// tailwind.config.js
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#22d3ee',
                surface: '#0D1117',
                dark: '#080A12',
                light: '#ffffff',
                accent: '#22d3ee',
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