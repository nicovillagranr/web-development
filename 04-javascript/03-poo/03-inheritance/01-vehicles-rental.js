class Vehicle {
  constructor(brand, dailyRate) {
    this.brand = brand;
    this.dailyRate = dailyRate;
  }

  rent(days) { return this.dailyRate * days; }
}

class ElectricCar extends Vehicle {
  rent(days) {
    return super.rent(days) * 0.9;
  }
}

const car = new ElectricCar('Tesla', 80);
console.log('[vehicles-rental] total =', car.rent(3));
