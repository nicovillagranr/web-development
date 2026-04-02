// 02 — Private State
// TS: dos formas de hacer propiedades privadas.
// Diferencia clave entre 'private' de TS y '#' de JS (privado real).
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
var _CounterJS_value, _BankAccount_balance;
// -------------------------------------------
// Opción 1: 'private' de TypeScript
// Solo es un error de compilación — no es privado en runtime
// -------------------------------------------
class CounterTS {
    constructor() {
        this.value = 0; // TypeScript private
    }
    increment() { this.value += 1; }
    current() { return this.value; }
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
    constructor() {
        _CounterJS_value.set(this, 0); // JS private field
    }
    increment() { __classPrivateFieldSet(this, _CounterJS_value, __classPrivateFieldGet(this, _CounterJS_value, "f") + 1, "f"); }
    current() { return __classPrivateFieldGet(this, _CounterJS_value, "f"); }
}
_CounterJS_value = new WeakMap();
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
    constructor(owner, initialBalance) {
        _BankAccount_balance.set(this, void 0);
        this.owner = owner;
        __classPrivateFieldSet(this, _BankAccount_balance, initialBalance, "f");
    }
    deposit(amount) {
        if (amount <= 0)
            throw new Error("El monto debe ser positivo");
        __classPrivateFieldSet(this, _BankAccount_balance, __classPrivateFieldGet(this, _BankAccount_balance, "f") + amount, "f");
    }
    withdraw(amount) {
        if (amount > __classPrivateFieldGet(this, _BankAccount_balance, "f"))
            return false;
        __classPrivateFieldSet(this, _BankAccount_balance, __classPrivateFieldGet(this, _BankAccount_balance, "f") - amount, "f");
        return true;
    }
    get balance() {
        return __classPrivateFieldGet(this, _BankAccount_balance, "f"); // expuesto como getter, no directamente
    }
}
_BankAccount_balance = new WeakMap();
const account = new BankAccount("Nico", 1000);
account.deposit(500);
console.log("[bank-account] balance =", account.balance); // 1500
export {};
// account.owner = "otro"; // Error — readonly
//# sourceMappingURL=02-private-state.js.map