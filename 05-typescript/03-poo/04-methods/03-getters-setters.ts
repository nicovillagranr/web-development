// 03 — Getters & Setters
// TS: getter devuelve un tipo específico; setter recibe un tipo específico.
// El getter y setter deben tener el mismo nombre de propiedad.

interface Dimensions {
  width: number;
  height: number;
}

class Rectangle {
  constructor(public width: number, public height: number) {}

  // getter — no recibe parámetros, retorna number
  get area(): number {
    return this.width * this.height;
  }

  get perimeter(): number {
    return 2 * (this.width + this.height);
  }

  // setter — recibe un objeto Dimensions (interfaz tipada)
  set dimensions({ width, height }: Dimensions) {
    if (width <= 0 || height <= 0) throw new Error("Dimensiones deben ser positivas");
    this.width = width;
    this.height = height;
  }
}

const rect = new Rectangle(4, 5);
console.log("[getters-setters] área inicial =", rect.area);      // 20
console.log("[getters-setters] perímetro =", rect.perimeter);    // 18

rect.dimensions = { width: 8, height: 3 };
console.log("[getters-setters] área nueva =", rect.area);        // 24

// Clase con getter calculado + setter con validación
class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  get celsius(): number { return this._celsius; }

  set celsius(value: number) {
    if (value < -273.15) throw new Error("Temperatura por debajo del cero absoluto");
    this._celsius = value;
  }

  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }

  get kelvin(): number {
    return this._celsius + 273.15;
  }
}

const temp = new Temperature(100);
console.log("[temperature] °C =", temp.celsius);      // 100
console.log("[temperature] °F =", temp.fahrenheit);   // 212
console.log("[temperature] K =", temp.kelvin);        // 373.15
