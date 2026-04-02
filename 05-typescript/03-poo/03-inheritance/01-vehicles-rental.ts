// 01 — Vehicles Rental
// TS: 'protected' permite acceso desde subclases pero no desde fuera.
// 'override' documenta explícitamente que el método reemplaza al padre.

class Vehicle {
  constructor(
    public brand: string,
    protected dailyRate: number // protected: accesible en subclases
  ) {}

  rent(days: number): number {
    return this.dailyRate * days;
  }
}

class ElectricCar extends Vehicle {
  override rent(days: number): number {
    // super.rent() llama al método del padre
    return super.rent(days) * 0.9; // 10% de descuento por ser eléctrico
  }
}

class Truck extends Vehicle {
  constructor(brand: string, dailyRate: number, private loadCapacity: number) {
    super(brand, dailyRate);
  }

  override rent(days: number): number {
    const extra: number = this.loadCapacity > 5000 ? 50 : 0;
    return super.rent(days) + extra * days;
  }
}

const car = new ElectricCar("Tesla", 80);
const truck = new Truck("Volvo", 120, 8000);

console.log("[vehicles-rental] Tesla 3 días =", car.rent(3));   // 216
console.log("[vehicles-rental] Volvo 3 días =", truck.rent(3)); // 510
