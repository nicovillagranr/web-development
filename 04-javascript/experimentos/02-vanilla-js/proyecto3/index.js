window.addEventListener('DOMContentLoaded', () => {

    // Seleccionar elementos del DOM
    let number = document.querySelector('.load__number')
    let btn = document.querySelector('.load__btn')
    let complete = document.querySelector('.load__complete')
    let background = document.querySelector('.main__background')

    // Variables contadores
    let porcentaje = 1
    let blur = 30

    btn.addEventListener('click' , () => {
        btn.style.display = "none"

        let intervalo = setInterval(() => {
            porcentaje++
            blur -= 30/100

            if(porcentaje > 100){
                clearInterval(intervalo)
                complete.style.display = "block"
            }
            else{
                number.innerHTML = porcentaje + `%`
                background.style.filter = `blur(${blur}px)`
            }
        }, 20)

    })
})