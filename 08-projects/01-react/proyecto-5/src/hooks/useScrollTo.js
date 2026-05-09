// ================= CONTEXTO MODULO =================
// Hook para smooth scroll a secciones por ID.
export function useScrollTo() {
  // Devuelve una función que hace scroll suave al elemento con el id dado.
  // El ?. evita errores si el elemento no existe en el DOM.
  return (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
