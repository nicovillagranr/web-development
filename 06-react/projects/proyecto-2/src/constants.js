// Constantes globales de la aplicación
// Rutas, labels, configuraciones, etc.

export const ROUTES = {
    HOME: '/',
    PRODUCTS: '/productos',
    PRODUCT_DETAIL: '/productos/:id',
    CART: '/carrito',
    LOGIN: '/login',
    REGISTER: '/registro',
}

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    TIMEOUT: 10000,
}

export const PRODUCT_FILTERS = {
    CATEGORIES: ["Hombres", "Mujeres", "Niños"],
    TYPES: ["Abrigos", "Ropa interior", "Calzado", "Accesorios"],
}

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

export const SORT_OPTIONS = [
    { value: "relevance", label: "Relevancia" },
    { value: "price-low-high", label: "Precio: Menor a mayor" },
    { value: "price-high-low", label: "Precio: Mayor a menor" },
    { value: "newest", label: "Novedades" },
]
