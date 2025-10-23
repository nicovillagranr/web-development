window.addEventListener('load' , () => {
    const s = document.querySelector(".wrap__gear")
    gsap.to(s ,  {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none",
    })
})