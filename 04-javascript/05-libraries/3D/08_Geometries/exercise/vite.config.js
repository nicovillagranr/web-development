import restart from 'vite-plugin-restart'

export default {
    base: './', // ✅ Para rutas relativas — esto es CLAVE

    root: 'src/', // ✅ Tu index.html está dentro de /src
    publicDir: '../static/',

    server: {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env)
    },

    build: {
        outDir: '../dist-Web-2', // ✅ Esto cambia según el proyecto
        emptyOutDir: true,
        sourcemap: true
    },

    plugins: [
        restart({ restart: [ '../static/**' ] })
    ],
}
