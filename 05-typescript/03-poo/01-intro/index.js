// introPOO.ts
// Programación Orientada a Objetos (POO) en TypeScript
// TS agrega tipos a propiedades de clase, parámetros y retornos.
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Contador_valor, _ConJSPrivate_secreto;
// -------------------------------
// 1. Clase básica con tipos
// -------------------------------
// Forma 1: declarar propiedades en el cuerpo de la clase
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }
}
const persona1 = new Persona("Ana", 25);
persona1.saludar();
// Forma 2 (shorthand): declarar y asignar en el constructor con modificadores de acceso
class PersonaShort {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }
}
class PersonaTyped {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }
}
// -------------------------------
// 2. Métodos con lógica — modificadores de acceso
// -------------------------------
class Cuenta {
    constructor(titular, saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }
    depositar(cantidad) {
        this.saldo += cantidad;
        console.log(`${this.titular} depositó ${cantidad}. Saldo: ${this.saldo}`);
    }
    retirar(cantidad) {
        if (cantidad > this.saldo) {
            console.log("Fondos insuficientes");
        }
        else {
            this.saldo -= cantidad;
            console.log(`${this.titular} retiró ${cantidad}. Saldo: ${this.saldo}`);
        }
    }
    getSaldo() {
        return this.saldo; // acceso al privado a través de un getter público
    }
}
const cuenta1 = new Cuenta("Carlos", 1000);
cuenta1.depositar(500);
cuenta1.retirar(200);
// cuenta1.saldo; // Error: 'saldo' es private
// -------------------------------
// 3. Herencia — extends + override
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
    // override indica que este método reemplaza al del padre
    hablar() {
        console.log(`${this.nombre} ladra`);
    }
}
const perro1 = new Perro("Firulais");
perro1.hablar(); // "Firulais ladra"
class Rectangulo {
    constructor(ancho, alto) {
        this.ancho = ancho;
        this.alto = alto;
    }
    // getter: devuelve number
    get area() {
        return this.ancho * this.alto;
    }
    // setter: recibe un objeto Dimensiones
    set dimensiones({ ancho, alto }) {
        this.ancho = ancho;
        this.alto = alto;
    }
}
const rect = new Rectangulo(10, 5);
console.log("Área:", rect.area); // 50
rect.dimensiones = { ancho: 20, alto: 10 };
console.log("Nueva área:", rect.area); // 200
// -------------------------------
// 5. Métodos estáticos
// -------------------------------
class Matematica {
    // static: se llama en la clase, no en una instancia
    static sumar(a, b) {
        return a + b;
    }
}
console.log("Suma:", Matematica.sumar(5, 7)); // 12
// -------------------------------
// 6. Propiedades privadas — JS # vs TS private
// -------------------------------
class Contador {
    constructor() {
        // JS private field (# prefix) — privado en tiempo de ejecución
        _Contador_valor.set(this, 0);
    }
    incrementar() { var _a; __classPrivateFieldSet(this, _Contador_valor, (_a = __classPrivateFieldGet(this, _Contador_valor, "f"), _a++, _a), "f"); }
    verValor() { return __classPrivateFieldGet(this, _Contador_valor, "f"); }
}
_Contador_valor = new WeakMap();
const contador = new Contador();
contador.incrementar();
contador.incrementar();
console.log(contador.verValor()); // 2
// contador.#valor; // Error — campo privado
// Diferencia: 'private' de TS vs '#' de JS
// - 'private' de TS: solo error en compilación, accesible en runtime
// - '#' de JS: privado real, inaccesible en runtime también
class ConTSPrivate {
    constructor() {
        this.secreto = "solo TS";
        // Si compilas a JS: this.secreto es accesible en runtime
    }
}
class ConJSPrivate {
    constructor() {
        _ConJSPrivate_secreto.set(this, "privado real");
        // En runtime el campo # es realmente inaccesible
    }
}
_ConJSPrivate_secreto = new WeakMap();
export {};
//# sourceMappingURL=index.js.map