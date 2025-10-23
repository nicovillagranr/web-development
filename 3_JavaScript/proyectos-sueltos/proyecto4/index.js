window.addEventListener('DOMContentLoaded', () => {
    let titulo = document.querySelector('.main__title');
    let texto = `¡Bienvenido al Curso!`
    let letraStart = 0
    let letraEnd = 1
    function escribir(){
        setInterval(() => {
            titulo.innerText = texto.slice(letraStart, letraEnd)
            letraEnd++
            if(letraEnd > texto.length){
                // letraEnd = 1
            }
        }, 100)
    }
    escribir()


    let caja = document.querySelector('.layout__main')
    gsap.from(caja , {
        opacity: 0,
        duration: 1,
        scale: 2,
        duration: 2.5,
        ease: "elastic.out(1,0.3)",
        // ease: "steps(10)",
        // stagger: 0.2
    })
});

