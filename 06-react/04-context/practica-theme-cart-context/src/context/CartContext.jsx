import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const PRODUCTS = [
  { id: 1, name: 'Curso React Basics', price: 19 },
  { id: 2, name: 'Pack Hooks Pro', price: 29 },
  { id: 3, name: 'Template Dashboard', price: 15 },
  { id: 4, name: 'Guia Router SPA', price: 22 },
]

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = state.items.find((entry) => entry.id === action.payload.id)
      if (item) {
        return {
          ...state,
          items: state.items.map((entry) =>
            entry.id === action.payload.id ? { ...entry, qty: entry.qty + 1 } : entry,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      }
    }

    case 'DECREMENT_ITEM': {
      return {
        ...state,
        items: state.items
          .map((entry) =>
            entry.id === action.payload ? { ...entry, qty: Math.max(entry.qty - 1, 0) } : entry,
          )
          .filter((entry) => entry.qty > 0),
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((entry) => entry.id !== action.payload),
      }
    }

    case 'CLEAR': {
      return {
        ...state,
        items: [],
      }
    }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const totals = useMemo(() => {
    const totalItems = state.items.reduce((acc, item) => acc + item.qty, 0)
    const totalPrice = state.items.reduce((acc, item) => acc + item.qty * item.price, 0)
    return { totalItems, totalPrice }
  }, [state.items])

  const value = useMemo(
    () => ({
      products: PRODUCTS,
      items: state.items,
      totals,
      addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
      decrementItem: (id) => dispatch({ type: 'DECREMENT_ITEM', payload: id }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, totals],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }

  return context
}
