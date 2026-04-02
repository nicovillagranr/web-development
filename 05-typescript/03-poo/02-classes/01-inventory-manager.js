// 01 — Inventory Manager
// TS: propiedades tipadas en la clase; métodos con return type explícito.
class InventoryItem {
    constructor(name, stock) {
        this.name = name;
        this.stock = stock;
    }
    add(units) {
        this.stock += units;
    }
    remove(units) {
        this.stock = Math.max(0, this.stock - units);
    }
}
const keyboard = new InventoryItem("Keyboard", 5);
keyboard.add(3);
keyboard.remove(2);
console.log("[inventory-manager]", keyboard);
export {};
//# sourceMappingURL=01-inventory-manager.js.map