// 02 — Shopping Cart
// TS: interfaz para CartItem; array tipado con CartItem[].
class Cart {
    constructor() {
        this.items = [];
    }
    add(product, price, qty = 1) {
        this.items.push({ product, price, qty });
    }
    total() {
        return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    }
    list() {
        return [...this.items]; // copia para no exponer el array interno
    }
}
const cart = new Cart();
cart.add("Mouse", 12, 2);
cart.add("Monitor", 210, 1);
console.log("[shopping-cart] total =", cart.total()); // 234
export {};
//# sourceMappingURL=02-shopping-cart.js.map