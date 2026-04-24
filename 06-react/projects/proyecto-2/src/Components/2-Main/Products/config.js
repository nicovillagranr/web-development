//   - Paso 6 — En Products, importar y usar API_URL en el fetch:
//   import { API_URL } from "../config"

//   const response = await fetch(`${API_URL}/products`)
//   - Paso 7 — En ProductCard, importar y prefijar el <img>:
//   import { API_URL } from "../config"

//   <img src={`${API_URL}${producto.image}`} ... />
//   - Paso 8 — Probar en local:
//   npm run dev
//   - Paso 9 — Commit y push del frontend:
//   git add .
//   git commit -m "feat: consumir imagenes desde la API con URL absoluta"
//   git push

export const API_URL = "https://01-products-api.vercel.app"