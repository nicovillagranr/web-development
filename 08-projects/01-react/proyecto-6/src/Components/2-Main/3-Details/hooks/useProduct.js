// Importamos el Fetch estandarizado
import { useFetch } from "../../../../hooks/useFetch"

const API_URL = import.meta.env.VITE_API_URL

export const useProduct = (id) => useFetch(`${API_URL}/products/${id}`)