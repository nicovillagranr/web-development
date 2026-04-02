// 02 — Shopping Cart
// TS: interfaz para CartItem; array tipado con CartItem[].

interface CartItem {
  product: string;
  price: number;
  qty: number;
}

class Cart {
  private items: CartItem[] = [];

  add(product: string, price: number, qty: number = 1): void {
    this.items.push({ product, price, qty });
  }

  total(): number {
    return this.items.reduce((sum: number, item: CartItem) => sum + item.price * item.qty, 0);
  }

  list(): CartItem[] {
    return [...this.items]; // copia para no exponer el array interno
  }
}

const cart = new Cart();
cart.add("Mouse", 12, 2);
cart.add("Monitor", 210, 1);
console.log("[shopping-cart] total =", cart.total()); // 234
