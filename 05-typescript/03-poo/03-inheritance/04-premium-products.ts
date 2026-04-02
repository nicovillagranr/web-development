// 04 — Premium Products
// TS: herencia simple; override documenta la intención.

class Product {
  constructor(
    public name: string,
    protected price: number
  ) {}

  finalPrice(): number {
    return this.price;
  }

  describe(): string {
    return `${this.name}: $${this.finalPrice()}`;
  }
}

class PremiumProduct extends Product {
  override finalPrice(): number {
    return this.price * 1.15; // +15% por ser premium
  }
}

class DiscountProduct extends Product {
  constructor(name: string, price: number, private discount: number) {
    super(name, price);
  }

  override finalPrice(): number {
    return this.price * (1 - this.discount / 100);
  }
}

const basic = new Product("Chair", 100);
const premium = new PremiumProduct("Chair Pro", 100);
const discounted = new DiscountProduct("Chair Outlet", 100, 20);

console.log("[premium-products]", {
  basic: basic.finalPrice(),        // 100
  premium: premium.finalPrice(),    // 115
  discounted: discounted.finalPrice(), // 80
});

console.log(basic.describe());
console.log(premium.describe());
console.log(discounted.describe());
