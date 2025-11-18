// Para exportar un producto THREE JS debemos modificar una línea del archivo vite-config.js
import restart from 'vite-plugin-restart'
// DEBEMOS PONER:  base: './', 

export default {
    base: './', // O cambia esto según tu hosting (ver más abajo 👇)
    root: 'src/',
    publicDir: '../static/',
    server: {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env)
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [
        restart({ restart: ['../static/**'] })
    ]
}
