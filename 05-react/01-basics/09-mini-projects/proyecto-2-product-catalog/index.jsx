import React, { useMemo, useState } from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

const PRODUCTS = [
  { id: 1, name: 'UI Kit', category: 'design', price: 19 },
  { id: 2, name: 'React Template', category: 'code', price: 29 },
  { id: 3, name: 'Icon Pack', category: 'design', price: 9 },
  { id: 4, name: 'API Starter', category: 'code', price: 39 },
]

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [cartCount, setCartCount] = useState(0)

  const visibleProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  return (
    <main>
      <section className="panel toolbar">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar producto"
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">Todas</option>
          <option value="design">Design</option>
          <option value="code">Code</option>
        </select>
        <strong>Carrito: {cartCount}</strong>
      </section>

      <section className="panel grid">
        {visibleProducts.map((product) => (
          <article key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>Categoria: {product.category}</p>
            <p>${product.price}</p>
            <button onClick={() => setCartCount((current) => current + 1)}>
              Agregar al carrito
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
