window.addEventListener('DOMContentLoaded', function(){

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".caja" , {
        x: 400,
        duration: 4,
        scrollTrigger: {
            trigger: ".caja",
            start: "top 50%",
            end: "bottom 40%",
            toggleClass: "red",
                                        // onEnter onLeave onEnterBack onLeaveBack
                                        // play pause resume reset restart reverse complete none
            toggleActions: "play none none none",
            // scrub: true,
            scrub: 4,
            markers: true,
        }
    })
})