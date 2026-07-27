// ─────────────────────────────────────────────────────────────
// FUNDAMENTOS DE JAVASCRIPT PARA REACT
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// 1: VARIABLES — const, let (→ en React: casi siempre usas const)
// ─────────────────────────────────────────────────────────────

const name = "Nicolás";
let isAuthorized = false;

// ─────────────────────────────────────────────────────────────
// 2: TEMPLATE LITERALS — interpolación de strings
// ─────────────────────────────────────────────────────────────

const greeting = `Hola, mi nombre es ${name}.`;
console.log(greeting);

// ─────────────────────────────────────────────────────────────
// 3: FUNCTIONS — declaración clásica vs arrow functions
// ─────────────────────────────────────────────────────────────

// Función declarada clásica
function hello() {
    console.log("Hello World");
    return 'Hello World';
}
hello();

// Función con parámetros
function saludo(nombre) {
    return `Hola ${nombre}, ¿cómo estás?`;
}
console.log(saludo("Nicolás"));

// Arrow function (→ en React: esta es la que más usas)
const showText = () => 'Esto es un texto';
const showNumber = () => 43;
const showBoolean = () => true;

// Arrow function con retorno implícito
const showArray = () => [1, 2, 3, 4, 5];
const showObject = () => ({ name: "Nicolás", age: 23 });

// ─────────────────────────────────────────────────────────────
// 4: OBJECTS — creación, acceso, métodos
// ─────────────────────────────────────────────────────────────

let Nicolas = {
    nombre: "Nicolás",
    edad: 23,
    profesion: "Desarrollador Web",
    hobbies: ["Programar", "Jugar videojuegos", "Viajar"],
    direccion: {
        pais: "Chile",
        ciudad: "Santiago",
        comuna: "Las Condes",
        calle: "Cerro el plomo"
    },
    sendMail() {
        return "Sending email..."
    }
}

console.log(Nicolas.hobbies.map((hobby) => `Me gusta ${hobby}`));
console.log(Nicolas.sendMail());

// ─────────────────────────────────────────────────────────────
// 5: DESTRUCTURING — extraer valores de objetos y arrays
// (→ en React: clave para props y estado: const { name, age } = props)
// ─────────────────────────────────────────────────────────────

// Destructuring de objetos
const user = {
    name: "Nico",
    age: 23
}

function printUser(userObj) {
    return `Hola ${userObj.name}, tienes ${userObj.age} años.`;
}
console.log(printUser(user));

// Destructuring de parámetros
function printUserDestructured({ name, age }) {
    return `Hola ${name}, tienes ${age} años.`;
}
console.log(printUserDestructured(user));

// Destructuring de arrays
const colors = ["rojo", "azul", "verde"];
const [firstColor, secondColor] = colors;
console.log(`Primera color: ${firstColor}`);

// ─────────────────────────────────────────────────────────────
// 6: ARRAYS Y ARRAY METHODS — map, filter, find
// (→ en React: lo más importante para renderizar listas)
// ─────────────────────────────────────────────────────────────

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log("Números duplicados:", doubled);

const evens = numbers.filter(num => num % 2 === 0);
console.log("Números pares:", evens);

const names = ["Ana", "Bruno", "Carlos", "Diana"];
const foundName = names.find(name => name.startsWith("C"));
console.log("Primer nombre que empieza con C:", foundName);

// ─────────────────────────────────────────────────────────────
// 7: SPREAD OPERATOR — copiar/combinar objetos y arrays
// (→ en React: esencial para actualizar estado sin mutar)
// ─────────────────────────────────────────────────────────────

// Spread en arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log("Array con spread:", arr2);

// Spread en objetos
const person = { name: "Juan", age: 30 };
const personWithCity = { ...person, city: "Madrid" };
console.log("Objeto con spread:", personWithCity);

// ─────────────────────────────────────────────────────────────
// 8: DOM MANIPULATION — crear elementos y event listeners
// (→ en React: React lo hace por ti, pero es útil saber por qué existe)
// ─────────────────────────────────────────────────────────────

// Seleccionar elemento
let titulo = document.getElementsByClassName("title")[0];
if (titulo) {
    titulo.innerHTML = "Hello World";
}

// Crear y añadir botón 1 (evento con arrow function)
const button = document.createElement("button");
button.innerText = "Haz clic aquí";
button.style.padding = "10px 20px";
button.addEventListener("click", () => {
    alert("¡Hola! Has hecho clic en el botón.");
});
document.body.appendChild(button);

// Crear y añadir botón 2 (evento con función anónima)
const button2 = document.createElement("button");
button2.innerText = "Haz clic aquí también";
button2.style.padding = "10px 20px";
button2.addEventListener("click", function () {
    alert("Botón 2 clickeado.");
})
document.body.appendChild(button2);

// Crear y añadir botón 3 (evento con arrow function)
const button3 = document.createElement("button");
button3.innerText = "Haz clic aqui";
button3.style.padding = "10px 20px";
button3.addEventListener("click", () => {
    alert("Botón 3 clickeado.");
});
document.body.appendChild(button3);

// Crear y añadir botón 4 (con condicional)
const button4 = document.createElement("button");
button4.innerText = "Haz clic aquí también";
button4.style.padding = "10px 20px";
document.body.appendChild(button4);

button4.addEventListener("click", () => {
    if (isAuthorized) {
        alert("Bienvenido, tienes acceso.");
    } else {
        alert("Lo siento, no tienes acceso.");
    }
})

// ─────────────────────────────────────────────────────────────
// 9: ASYNC / AWAIT — fetch de datos
// (→ en React: lo usas en useEffect para traer datos de APIs)
// ─────────────────────────────────────────────────────────────

// Promesa básica
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("¡Operación completada!");
    }, 2000);
});

promise.then(result => {
    console.log(result);
});

// Función async/await (alternativa más limpia)
async function fetchData() {
    try {
        // Simular una llamada a API
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        console.log("Datos de API:", data);
    } catch (error) {
        console.error("Error al traer datos:", error);
    }
}

// Descomenta la siguiente línea para ejecutar
fetchData();


// Métodos de Arrays
const nombres = ["Ana", "Bruno", "Carlos", "Diana"];

nombres.forEach(nombre => console.log(nombre)); // Imprime cada nombre

const upperNames = nombres.map(nombre => nombre.toUpperCase());
console.log("Nombres en mayúscula:", upperNames);

const longNames = nombres.filter(nombre => nombre.length > 4);
console.log("Nombres con más de 4 letras:", longNames);

const foundNombre = nombres.find(nombre => nombre.startsWith("C"));
console.log("Primer nombre que empieza con C:", foundNombre);

const sum = numbers.reduce((total, num) => total + num, 0);
console.log("Suma de los números:", sum);

// Spread Operator
const soldado = {
    name: "Ryan",
    age: 25
}

const adress = {
    city: "New York",
    country: "USA"
}

const userWithAdress = { ...user, ...adress };
console.log("Usuario con dirección:", userWithAdress);


// Async/Await | Biblioteca de fetch

// const ul = document.createElement("ul");
// document.body.appendChild(ul)

// Lógica antigua con then
// let data = fetch("https://jsonplaceholder.typicode.com/photos")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         data.map(item => {
//             const li = document.createElement("li");
//             li.innerText = item.title;
//             ul.appendChild(li);
//         })
//     });


// Lógica moderna con async/await
const URL = "https://01-products-api.vercel.app/"

const ul = document.createElement("ul");
document.body.appendChild(ul);

async function fetchPhotos() {
    try {
        const response = await fetch("https://01-products-api.vercel.app/products");
        const data = await response.json();
        console.log("Data de API:", data);
        data.map(product => {
            const li = document.createElement("li");
            li.innerText = product.nombre;
            ul.appendChild(li);

            const img = document.createElement("img");
            img.src = `${URL}${product.image}`;
            img.style.width = "100px";
            ul.appendChild(img);
        })
    }
    catch (error) {
        console.error("Error al traer productos:", error);
    }
}
// fetchPhotos();


// ─────────────────────────────────────────────────────────────
// VERSIÓN PROFESIONAL: Usando Cliente HTTP
// ─────────────────────────────────────────────────────────────

import { apiClient } from "./api/client.js";

const ul2 = document.createElement("ul");
document.body.appendChild(ul2);

async function fetchPhotosWithClient() {
    try {
        const products = await apiClient.get("/products");

        products.map(product => {
            const li = document.createElement("li");
            li.innerText = product.nombre;
            ul2.appendChild(li);

            const img = document.createElement("img");
            img.src = `https://01-products-api.vercel.app${product.image}`;
            img.style.width = "100px";
            ul2.appendChild(img);
        });
    } catch (error) {
        console.error("Error al traer productos:", error);
    }
}

// Descomenta para ver la versión profesional en acción
fetchPhotosWithClient();