export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    plugins: [],

    theme: {
        screens: {
            xxs: "320px",
            xs: "360px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        extend: {
            colors: {
                primary: '#ff5959',
                secondary: '#e8e8e8',
                footer: '#b6b6b6',
            },
        },
    },
}
