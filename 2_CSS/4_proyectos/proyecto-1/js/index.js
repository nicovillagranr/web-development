document.addEventListener('visibilitychange', () => {
    const favicon = document.querySelector("link[rel='icon']") || document.createElement('link');
    favicon.rel = 'icon';

    if (document.hidden) {
        setTimeout(() => {
            document.title = "¿Te fuiste?👀";
            favicon.href = "assets/img/triste.png"; // Ruta del favicon alternativo
            document.head.appendChild(favicon);
        }, 1500);
    } else {
        document.title = "Mi Portfolio";
        favicon.href = "assets/img/icon.png"; // Ruta del favicon original
        document.head.appendChild(favicon);
    }
});

window.addEventListener('load' , () => {
    gsap.from(".layout" , {
        delay: 0.5,
        scale: 0.5,
        duration: 1.5,
        opacity: 0,
        ease: "elastic.out"
    })
})