// 01 — Inventory Manager
// TS: propiedades tipadas en la clase; métodos con return type explícito.

class InventoryItem {
  name: string;
  stock: number;

  constructor(name: string, stock: number) {
    this.name = name;
    this.stock = stock;
  }

  add(units: number): void {
    this.stock += units;
  }

  remove(units: number): void {
    this.stock = Math.max(0, this.stock - units);
  }
}

const keyboard = new InventoryItem("Keyboard", 5);
keyboard.add(3);
keyboard.remove(2);
console.log("[inventory-manager]", keyboard);
