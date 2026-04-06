// ============================================================
// 08 — CLASES EN TYPESCRIPT
// ============================================================

// TS agrega a las clases JS: modificadores de acceso, tipos, interfaces, etc.

// ------------------------------------------------------------
// Clase básica con tipos
// ------------------------------------------------------------
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar(): string {
    return `Hola, soy ${this.nombre}`;
  }
}

const p = new Persona("Nico", 28);
console.log(p.saludar());

// ------------------------------------------------------------
// Shortcut: declarar propiedades EN el constructor
// ------------------------------------------------------------
// Evita la repetición. Los modificadores (public/private/readonly)
// convierten automáticamente los params en propiedades.

class PersonaCorta {
  constructor(
    public nombre: string,
    public edad: number,
    private readonly id: number
  ) {}

  info(): string {
    return `${this.nombre} (${this.edad}) - ID: ${this.id}`;
  }
}

const p2 = new PersonaCorta("Ana", 25, 1001);
console.log(p2.info());
// p2.id; // ❌ private

// ------------------------------------------------------------
// Modificadores de acceso
// ------------------------------------------------------------
// public    — accesible desde cualquier lugar (default)
// private   — solo dentro de la clase
// protected — dentro de la clase y sus subclases
// readonly  — solo lectura (se setea en constructor)

class CuentaBancaria {
  public titular: string;
  private saldo: number;
  protected readonly numero: string;

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.numero = Math.random().toString(36).slice(2, 10);
  }

  depositar(monto: number): void {
    if (monto > 0) this.saldo += monto;
  }

  consultarSaldo(): number {
    return this.saldo;
  }
}

const cuenta = new CuentaBancaria("Nico", 1000);
cuenta.depositar(500);
console.log(cuenta.consultarSaldo()); // 1500
// cuenta.saldo; // ❌ private

// ------------------------------------------------------------
// Herencia
// ------------------------------------------------------------
class CuentaPremium extends CuentaBancaria {
  private limiteCredito: number;

  constructor(titular: string, saldo: number, limite: number) {
    super(titular, saldo); // llamar al constructor padre
    this.limiteCredito = limite;
  }

  info(): string {
    // Puede acceder a `numero` porque es protected
    return `Cuenta Premium ${this.numero} de ${this.titular} (límite: ${this.limiteCredito})`;
  }
}

const premium = new CuentaPremium("Nico", 5000, 10000);
console.log(premium.info());

// ------------------------------------------------------------
// Implementar interfaces
// ------------------------------------------------------------
interface Saludable {
  saludar(): string;
  despedirse(): string;
}

class Ingles implements Saludable {
  saludar(): string {
    return "Hello";
  }
  despedirse(): string {
    return "Goodbye";
  }
}

class Espanol implements Saludable {
  saludar(): string {
    return "Hola";
  }
  despedirse(): string {
    return "Adiós";
  }
}

const saludadores: Saludable[] = [new Ingles(), new Espanol()];
saludadores.forEach((s) => console.log(s.saludar(), "/", s.despedirse()));

// ------------------------------------------------------------
// Clases genéricas
// ------------------------------------------------------------
class Contenedor<T> {
  private items: T[] = [];

  agregar(item: T): void {
    this.items.push(item);
  }

  obtenerTodos(): T[] {
    return [...this.items];
  }
}

const nums = new Contenedor<number>();
nums.agregar(1);
nums.agregar(2);
console.log(nums.obtenerTodos());

const strs = new Contenedor<string>();
strs.agregar("hola");
strs.agregar("chau");
console.log(strs.obtenerTodos());

// ============================================================
// EJERCICIOS
// ============================================================
// 1. Crea una clase `Producto` con nombre, precio y stock. Método `vender(cantidad)`.
// 2. Crea una interface `Imprimible` con método `imprimir()`. Implementa en `Factura` y `Recibo`.
// 3. Crea una clase genérica `Cola<T>` con métodos `encolar(item)` y `desencolar(): T | undefined`.

export {};
