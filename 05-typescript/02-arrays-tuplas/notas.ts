// ============================================================
// 02 — ARRAYS Y TUPLAS
// ============================================================

// ------------------------------------------------------------
// Arrays tipados: dos sintaxis equivalentes
// ------------------------------------------------------------
const numeros: number[] = [1, 2, 3];
const nombres: Array<string> = ["Ana", "Luis", "Sofía"];

// Ambas son válidas. La primera (`number[]`) es más común.

// numeros.push("cuatro"); // ❌ error: solo se pueden pushear números

// ------------------------------------------------------------
// Arrays de unión: acepta varios tipos
// ------------------------------------------------------------
const mixto: (string | number)[] = [1, "dos", 3, "cuatro"];

// ------------------------------------------------------------
// readonly: array inmutable
// ------------------------------------------------------------
const dias: readonly string[] = ["lun", "mar", "mié"];
// dias.push("jue"); // ❌ error: readonly no permite mutar

// ------------------------------------------------------------
// Tuplas: array con cantidad y tipo FIJOS en cada posición
// ------------------------------------------------------------
// Muy útil para: coordenadas, pares clave-valor, retornos múltiples.
const coordenada: [number, number] = [10, 20];
const usuario: [string, number, boolean] = ["Nico", 28, true];

// El orden importa:
// const mal: [number, number] = [10, "20"]; // ❌ error

// Desestructuración con tipos automáticos:
const [x, y] = coordenada; // x: number, y: number
console.log({ x, y });

// ------------------------------------------------------------
// Tuplas con nombres (más legible)
// ------------------------------------------------------------
type Punto3D = [x: number, y: number, z: number];
const origen: Punto3D = [0, 0, 0];
console.log(origen);

// ------------------------------------------------------------
// Ejemplo real: hook de React devuelve una tupla
// ------------------------------------------------------------
// const [count, setCount] = useState(0);
//        ^ number   ^ función
// useState retorna internamente algo como: [T, (newValue: T) => void]

// ============================================================
// EJERCICIOS
// ============================================================
// 1. Crea un array `precios: number[]` con 5 valores. Calcula el total con reduce.
// 2. Crea una tupla `usuario: [string, number]` con nombre y edad. Desestructúrala.
// 3. Crea una función `dividir(a, b)` que retorne una tupla `[cociente, resto]`.

export {};
