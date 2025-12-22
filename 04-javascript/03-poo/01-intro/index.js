// introPOO.js
// Ejemplos básicos de Programación Orientada a Objetos (POO) en JS

// -------------------------------
// 1. Clase básica
// -------------------------------
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }
}

// Crear instancia
const persona1 = new Persona("Ana", 25);
persona1.saludar(); // Hola, soy Ana y tengo 25 años.

// -------------------------------
// 2. Métodos con lógica
// -------------------------------
class Cuenta {
    constructor(titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }

    depositar(cantidad) {
        this.saldo += cantidad;
        console.log(`${this.titular} depositó ${cantidad}. Saldo actual: ${this.saldo}`);
    }

    retirar(cantidad) {
        if (cantidad > this.saldo) {
            console.log("Fondos insuficientes");
        } else {
            this.saldo -= cantidad;
            console.log(`${this.titular} retiró ${cantidad}. Saldo actual: ${this.saldo}`);
        }
    }
}

const cuenta1 = new Cuenta("Carlos", 1000);
cuenta1.depositar(500);
cuenta1.retirar(200);

// -------------------------------
// 3. Herencia
// -------------------------------
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }

    hablar() {
        console.log(`${this.nombre} hace un sonido`);
    }
}

class Perro extends Animal {
    hablar() {
        console.log(`${this.nombre} ladra`);
    }
}

const perro1 = new Perro("Firulais");
perro1.hablar(); // Firulais ladra

// -------------------------------
// 4. Getters y Setters
// -------------------------------
class Rectangulo {
    constructor(ancho, alto) {
        this.ancho = ancho;
        this.alto = alto;
    }

    get area() {
        return this.ancho * this.alto;
    }

    set dimensiones({ ancho, alto }) {
        this.ancho = ancho;
        this.alto = alto;
    }
}

const rect = new Rectangulo(10, 5);
console.log("Área:", rect.area); // Área: 50
rect.dimensiones = { ancho: 20, alto: 10 };
console.log("Nueva área:", rect.area); // Nueva área: 200

// -------------------------------
// 5. Métodos estáticos
// -------------------------------
class Matematica {
    static sumar(a, b) {
        return a + b;
    }
}

console.log("Suma:", Matematica.sumar(5, 7)); // Suma: 12

// -------------------------------
// 6. Propiedades privadas (JS moderno)
// -------------------------------
class Contador {
    #valor = 0;

    incrementar() {
        this.#valor++;
    }

    verValor() {
        console.log(this.#valor);
    }
}

const contador = new Contador();
contador.incrementar();
contador.incrementar();
contador.verValor(); // 2
// contador.#valor // ERROR: privado
