class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  finalPrice() { return this.price; }
}

class PremiumProduct extends Product {
  finalPrice() { return this.price * 1.15; }
}

const basic = new Product('Chair', 100);
const premium = new PremiumProduct('Chair Pro', 100);
console.log('[premium-products]', { basic: basic.finalPrice(), premium: premium.finalPrice() });
