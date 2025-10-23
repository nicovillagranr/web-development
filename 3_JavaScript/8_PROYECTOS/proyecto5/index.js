let contenedorTabla = document.querySelector(".tables")

let result = 0

for(let i = 1; i <= 10; i++){
    // Plantilla para mostrar el encabezado
    // Y creamos la caja para las operaciones de la tabla
    contenedorTabla.innerHTML += `
    <div class="tables__item">
        <h2 class="item__title">Tabla del ${i}</h2>
        <ul class="item__list" data-id="${i}"></ul>
    </div>`

    // Bucle para sacar números para las operaciones de la tabla
    for(let n = 1; n <= 10; n++){
        // Calcular resultado de la operación
        result = i * n

        // Sacar caja donde mostrar operaciones
        let list = document.querySelectorAll(".item__list")

        // Imprimir resultado en cada una de las cajas
        list.forEach(list => {
            let id = document.getAttribute("data-id")
        })

    }
}