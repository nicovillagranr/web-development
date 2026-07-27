window.addEventListener("load" , function () {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Trigger
    gsap.from(".hero__title", {
        opacity: 0,
        scale: .5,
        delay: .5,
        duration: 1,
    })

    gsap.from(".about__title", {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: ".about__title"
    })

    gsap.from(".grid__subtitle span" , {
        y: 100,
        opacity: 0,
        scrollTrigger: ".about__grid",
        delay: 1,
        stagger: 0.5
    })

    gsap.from(".grid__item p" , {
        x: -100,
        opacity: 0,
        delay: 1,
        stagger: 0.5,
        scrollTrigger: ".grid__item p",
    })

    gsap.to(".hero__img" , {
        bottom: "100%",
        right: "100%",
        duration: 2,
        scrollTrigger: {
            trigger: ".hero__img",
            start: "bottom bottom",
            end: "bottom top",
            // markers: true,
            scrub: true
        }
    })
})