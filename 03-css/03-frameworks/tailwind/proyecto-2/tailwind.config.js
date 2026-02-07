// tailwind.config.js
module.exports = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ff5959',
                surface: '#E5E7EB',
                dark: '#1a1a1a',
                light: '#ffffff',
            },
            height: {
                '800': '800px',
            },
            width: {
                '500': '500px',
            },
            fontFamily: {
                sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
}
