// 04 — Premium Products
// TS: herencia simple; override documenta la intención.
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    finalPrice() {
        return this.price;
    }
    describe() {
        return `${this.name}: $${this.finalPrice()}`;
    }
}
class PremiumProduct extends Product {
    finalPrice() {
        return this.price * 1.15; // +15% por ser premium
    }
}
class DiscountProduct extends Product {
    constructor(name, price, discount) {
        super(name, price);
        this.discount = discount;
    }
    finalPrice() {
        return this.price * (1 - this.discount / 100);
    }
}
const basic = new Product("Chair", 100);
const premium = new PremiumProduct("Chair Pro", 100);
const discounted = new DiscountProduct("Chair Outlet", 100, 20);
console.log("[premium-products]", {
    basic: basic.finalPrice(), // 100
    premium: premium.finalPrice(), // 115
    discounted: discounted.finalPrice(), // 80
});
console.log(basic.describe());
console.log(premium.describe());
console.log(discounted.describe());
export {};
//# sourceMappingURL=04-premium-products.js.map