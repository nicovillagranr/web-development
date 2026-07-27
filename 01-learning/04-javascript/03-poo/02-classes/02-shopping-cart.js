class Cart {
  constructor() { this.items = []; }

  add(product, price, qty = 1) {
    this.items.push({ product, price, qty });
  }

  total() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}

const cart = new Cart();
cart.add('Mouse', 12, 2);
cart.add('Monitor', 210, 1);
console.log('[shopping-cart] total =', cart.total());
