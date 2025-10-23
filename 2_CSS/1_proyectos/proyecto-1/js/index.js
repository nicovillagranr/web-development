window.addEventListener("load", () => {
    gsap.from(".content__header h1" , {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
    });
});
