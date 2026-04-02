// 02 — Local Storefront
// TS: interface Product; interface CartItem extends Product (herencia de interfaces); literal union type Category.
const filterEl = document.querySelector('#filter');
const catalog = document.querySelector('#catalog');
const cartEl = document.querySelector('#cart');
const cartTotal = document.querySelector('#cartTotal');
const checkout = document.querySelector('#checkout');
const products = [
    { id: 'p1', name: 'Mechanical Keyboard', category: 'hardware', price: 90 },
    { id: 'p2', name: 'Gaming Mouse', category: 'hardware', price: 45 },
    { id: 'p3', name: 'Studio Headphones', category: 'audio', price: 120 },
    { id: 'p4', name: 'USB Mic', category: 'audio', price: 85 },
];
let cart = JSON.parse(localStorage.getItem('storefront-cart') ?? '[]');
function save() {
    localStorage.setItem('storefront-cart', JSON.stringify(cart));
}
function renderCatalog() {
    const selected = filterEl.value;
    const items = selected === 'all'
        ? products
        : products.filter((p) => p.category === selected);
    catalog.innerHTML = '';
    items.forEach((product) => {
        const article = document.createElement('article');
        article.className = 'item';
        article.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <strong>$${product.price}</strong>
      <div class="row">
        <button data-add="${product.id}">Agregar</button>
      </div>
    `;
        catalog.appendChild(article);
    });
}
function renderCart() {
    cartEl.innerHTML = '';
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
      <div class="row" style="justify-content:space-between;align-items:center;">
        <span>${item.name} x${item.qty}</span>
        <span>$${item.price * item.qty}</span>
      </div>
    `;
        cartEl.appendChild(li);
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartTotal.textContent = `Total: $${total}`;
}
catalog.addEventListener('click', (event) => {
    const target = event.target;
    const id = target.dataset['add'];
    if (!id)
        return;
    const product = products.find((p) => p.id === id);
    if (!product)
        return;
    const existing = cart.find((item) => item.id === id);
    if (existing) {
        existing.qty += 1;
    }
    else {
        cart.push({ ...product, qty: 1 });
    }
    save();
    renderCart();
});
filterEl.addEventListener('change', renderCatalog);
checkout.addEventListener('click', () => {
    cart = [];
    save();
    renderCart();
});
renderCatalog();
renderCart();
export {};
//# sourceMappingURL=index.js.map