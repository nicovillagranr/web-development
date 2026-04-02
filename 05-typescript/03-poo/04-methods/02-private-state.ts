// 02 — Private State
// TS: dos formas de hacer propiedades privadas.
// Diferencia clave entre 'private' de TS y '#' de JS (privado real).

// -------------------------------------------
// Opción 1: 'private' de TypeScript
// Solo es un error de compilación — no es privado en runtime
// -------------------------------------------
class CounterTS {
  private value: number = 0; // TypeScript private

  increment(): void { this.value += 1; }
  current(): number { return this.value; }
}

const counterTS = new CounterTS();
counterTS.increment();
counterTS.increment();
console.log("[private-state TS] value =", counterTS.current()); // 2
// counterTS.value; // Error de compilación — pero en JS puro sí accede

// -------------------------------------------
// Opción 2: '#' de JavaScript (ES2022)
// Privado real — inaccesible en runtime también
// -------------------------------------------
class CounterJS {
  #value: number = 0; // JS private field

  increment(): void { this.#value += 1; }
  current(): number { return this.#value; }
}

const counterJS = new CounterJS();
counterJS.increment();
counterJS.increment();
console.log("[private-state JS#] value =", counterJS.current()); // 2
// counterJS.#value; // Error — realmente inaccesible

// -------------------------------------------
// Cuándo usar cada uno:
// 'private' TS → interoperabilidad con código JS; herramientas TS
// '#' JS      → privacidad real en runtime; clases que se usan sin TS
// -------------------------------------------

// Clase más completa con private state
class BankAccount {
  #balance: number;
  readonly owner: string; // readonly: solo lectura después del constructor

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("El monto debe ser positivo");
    this.#balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount > this.#balance) return false;
    this.#balance -= amount;
    return true;
  }

  get balance(): number {
    return this.#balance; // expuesto como getter, no directamente
  }
}

const account = new BankAccount("Nico", 1000);
account.deposit(500);
console.log("[bank-account] balance =", account.balance); // 1500
// account.owner = "otro"; // Error — readonly
