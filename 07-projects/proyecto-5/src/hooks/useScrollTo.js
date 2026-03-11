// ================= CONTEXTO MODULO =================
// Hook para smooth scroll a secciones por ID.
export function useScrollTo() {
  return (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
