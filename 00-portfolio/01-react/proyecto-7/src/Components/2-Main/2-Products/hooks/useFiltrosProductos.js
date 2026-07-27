import { useState } from "react"

// Encapsula: estado de filtros + toggle + aplicación del filtro a la lista
export const useFiltrosProductos = (productos) => {
    // Mismo estado inicial que tenías en Products.jsx
    const [filtros, setFiltros] = useState({ categorias: [], tipos: [] })

    // Agrega o saca un valor del array correspondiente (categorias o tipos)
    // Si el valor ya está -> lo quita. Si no está -> lo agrega
    const toggleFiltros = (tipoFiltro, valor) => {
        setFiltros((prev) => ({
            ...prev,
            [tipoFiltro]: prev[tipoFiltro].includes(valor) ? prev[tipoFiltro].filter((item) => item !== valor) : [...prev[tipoFiltro], valor],
        }))
    }

    // Aplicamos los filtros a la lista que nos pasaron
    // Si un grupo de filtros está vacío -> no filtra por ese campo (Deja pasar todo)
    const productosFiltrados = productos.filter((producto) => {
        const matchCategoria = filtros.categorias.length === 0 || filtros.categorias.includes(producto.categoria)
        const matchTipo = filtros.tipos.length === 0 || filtros.tipos.includes(producto.tipo)
        return matchCategoria && matchTipo
    })

    return { filtros, toggleFiltros, productosFiltrados }
}