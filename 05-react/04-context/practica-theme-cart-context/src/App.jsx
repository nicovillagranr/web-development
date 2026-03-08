import { useCart } from './context/CartContext'
import { useTheme } from './context/ThemeContext'

function ProductCatalog() {
  const { products, addItem } = useCart()

  return (
    <section className="panel">
      <h2>Catalogo</h2>
      <div className="catalog-grid">
        {products.map((product) => (
          <article key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addItem(product)}>Agregar</button>
          </article>
        ))}
      </div>
    </section>
  )
}

function CartSummary() {
  const { items, totals, decrementItem, addItem, removeItem, clear } = useCart()

  return (
    <section className="panel">
      <header className="row-between">
        <h2>Carrito</h2>
        <button className="ghost" onClick={clear}>
          Vaciar
        </button>
      </header>

      {items.length === 0 ? (
        <p className="empty">No hay productos agregados.</p>
      ) : (
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <small>
                  ${item.price} x {item.qty}
                </small>
              </div>
              <div className="row-end">
                <button className="ghost" onClick={() => decrementItem(item.id)}>
                  -
                </button>
                <button className="ghost" onClick={() => addItem(item)}>
                  +
                </button>
                <button className="danger" onClick={() => removeItem(item.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="summary">
        <p>Items: {totals.totalItems}</p>
        <p>Total: ${totals.totalPrice}</p>
      </footer>
    </section>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">React Context</p>
          <h1>Theme + Cart Store</h1>
          <p>Estado global para UI y datos compartidos entre componentes.</p>
        </div>
        <button onClick={toggleTheme}>Tema actual: {theme}</button>
      </header>

      <section className="layout-grid">
        <ProductCatalog />
        <CartSummary />
      </section>
    </main>
  )
}
