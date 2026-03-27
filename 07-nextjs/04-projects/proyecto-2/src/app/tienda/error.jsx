"use client"

import { useEffect } from "react"

export default function TiendaError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="font-(family-name:--font-outfit) text-2xl font-bold">
        Algo salió mal
      </h2>
      <p className="text-text-muted">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-accent text-white py-2 px-6 rounded-lg font-semibold transition-transform hover:-translate-y-0.5"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
