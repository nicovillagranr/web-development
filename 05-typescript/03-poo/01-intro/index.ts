// introPOO.ts
// Programación Orientada a Objetos (POO) en TypeScript
// TS agrega tipos a propiedades de clase, parámetros y retornos.

// -------------------------------
// 1. Clase básica con tipos
// -------------------------------

// Forma 1: declarar propiedades en el cuerpo de la clase
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar(): void {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
  }
}

const persona1 = new Persona("Ana", 25);
persona1.saludar();

// Forma 2 (shorthand): declarar y asignar en el constructor con modificadores de acceso
class PersonaShort {
  constructor(public nombre: string, public edad: number) {}

  saludar(): void {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
  }
}

// Forma 3: usar interfaz + implements
interface IPersona {
  nombre: string;
  edad: number;
  saludar(): void;
}

class PersonaTyped implements IPersona {
  constructor(public nombre: string, public edad: number) {}
  saludar(): void {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
  }
}

// -------------------------------
// 2. Métodos con lógica — modificadores de acceso
// -------------------------------

class Cuenta {
  titular: string;
  private saldo: number; // 'private' — no accesible fuera de la clase

  constructor(titular: string, saldo: number) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(cantidad: number): void {
    this.saldo += cantidad;
    console.log(`${this.titular} depositó ${cantidad}. Saldo: ${this.saldo}`);
  }

  retirar(cantidad: number): void {
    if (cantidad > this.saldo) {
      console.log("Fondos insuficientes");
    } else {
      this.saldo -= cantidad;
      console.log(`${this.titular} retiró ${cantidad}. Saldo: ${this.saldo}`);
    }
  }

  getSaldo(): number {
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
  constructor(public nombre: string) {}

  hablar(): void {
    console.log(`${this.nombre} hace un sonido`);
  }
}

class Perro extends Animal {
  // override indica que este método reemplaza al del padre
  override hablar(): void {
    console.log(`${this.nombre} ladra`);
  }
}

const perro1 = new Perro("Firulais");
perro1.hablar(); // "Firulais ladra"

// -------------------------------
// 4. Getters y Setters — tipos explícitos
// -------------------------------

interface Dimensiones {
  ancho: number;
  alto: number;
}

class Rectangulo {
  constructor(public ancho: number, public alto: number) {}

  // getter: devuelve number
  get area(): number {
    return this.ancho * this.alto;
  }

  // setter: recibe un objeto Dimensiones
  set dimensiones({ ancho, alto }: Dimensiones) {
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
  static sumar(a: number, b: number): number {
    return a + b;
  }
}

console.log("Suma:", Matematica.sumar(5, 7)); // 12

// -------------------------------
// 6. Propiedades privadas — JS # vs TS private
// -------------------------------

class Contador {
  // JS private field (# prefix) — privado en tiempo de ejecución
  #valor: number = 0;

  incrementar(): void { this.#valor++; }
  verValor(): number { return this.#valor; }
}

const contador = new Contador();
contador.incrementar();
contador.incrementar();
console.log(contador.verValor()); // 2
// contador.#valor; // Error — campo privado

// Diferencia: 'private' de TS vs '#' de JS
// - 'private' de TS: solo error en compilación, accesible en runtime
// - '#' de JS: privado real, inaccesible en runtime también
class ConTSPrivate {
  private secreto: string = "solo TS";
  // Si compilas a JS: this.secreto es accesible en runtime
}

class ConJSPrivate {
  #secreto: string = "privado real";
  // En runtime el campo # es realmente inaccesible
}
