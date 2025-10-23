const text = new SplitType('.hero-title', { types: 'words, chars' });

text.chars.forEach((char , i) => {

    let charsTl = gsap.timeline();

    charsTl.from(char, {
    y: gsap.utils.random(-250, 250),
    x: gsap.utils.random(-250, 250),
    rotationX: gsap.utils.random(-720, 720),
    rotationY: gsap.utils.random(-720, 720),
    rotationZ: gsap.utils.random(-720, 720),
    scale: gsap.utils.random(0.1, 2),
    opacity: 0,
    duration: 3,
    delay: i * 0.01,
    ease: "elastic.out(1, 0.7)",
    });

    charsTl.from(char, {
        color: `rgb(${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)})`,
        duration: 1
    });


    char.addEventListener('mouseenter', charsHover)
    let charOriginalColor = window.getComputedStyle(char).color;

    function charsHover() {
        gsap.timeline().to(char , {
            y: gsap.utils.random(-50, 50),
            x: gsap.utils.random(-50, 50),
            rotate: gsap.utils.random(-90, 90),
            scale: gsap.utils.random(0.5, 1.5),
            color: `rgb(${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)})`,
            onComplete: () => {
                char.removeEventListener('mouseenter', charsHover)
            }
            // charsTl.restart();
        })
        .to(char , {
            y: 0,
            x: 0,
            rotate: 0,
            color: charOriginalColor,
            scale: 1,
            onComplete: () => {
                char.addEventListener('mouseenter', charsHover)
            }
        })
    }
});
