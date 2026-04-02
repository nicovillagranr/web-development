// 02 — Local Storefront
// TS: interface Product; interface CartItem extends Product (herencia de interfaces); literal union type Category.

const filterEl = document.querySelector<HTMLSelectElement>('#filter')!;
const catalog = document.querySelector<HTMLDivElement>('#catalog')!;
const cartEl = document.querySelector<HTMLUListElement>('#cart')!;
const cartTotal = document.querySelector<HTMLSpanElement>('#cartTotal')!;
const checkout = document.querySelector<HTMLButtonElement>('#checkout')!;

type Category = 'hardware' | 'audio';

interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
}

// CartItem extiende Product — hereda todos sus campos y agrega qty
interface CartItem extends Product {
  qty: number;
}

const products: Product[] = [
  { id: 'p1', name: 'Mechanical Keyboard', category: 'hardware', price: 90 },
  { id: 'p2', name: 'Gaming Mouse', category: 'hardware', price: 45 },
  { id: 'p3', name: 'Studio Headphones', category: 'audio', price: 120 },
  { id: 'p4', name: 'USB Mic', category: 'audio', price: 85 },
];

let cart: CartItem[] = JSON.parse(localStorage.getItem('storefront-cart') ?? '[]') as CartItem[];

function save(): void {
  localStorage.setItem('storefront-cart', JSON.stringify(cart));
}

function renderCatalog(): void {
  const selected: string = filterEl.value;
  const items: Product[] =
    selected === 'all'
      ? products
      : products.filter((p: Product): boolean => p.category === selected);

  catalog.innerHTML = '';
  items.forEach((product: Product): void => {
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

function renderCart(): void {
  cartEl.innerHTML = '';

  cart.forEach((item: CartItem): void => {
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

  const total: number = cart.reduce(
    (sum: number, item: CartItem): number => sum + item.price * item.qty,
    0
  );
  cartTotal.textContent = `Total: $${total}`;
}

catalog.addEventListener('click', (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  const id: string | undefined = target.dataset['add'];
  if (!id) return;

  const product: Product | undefined = products.find((p: Product): boolean => p.id === id);
  if (!product) return;

  const existing: CartItem | undefined = cart.find((item: CartItem): boolean => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  save();
  renderCart();
});

filterEl.addEventListener('change', renderCatalog);

checkout.addEventListener('click', (): void => {
  cart = [];
  save();
  renderCart();
});

renderCatalog();
renderCart();
