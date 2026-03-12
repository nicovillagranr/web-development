'use client'
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Client Component completo ("use client" en un page.js)
//
// Esta página usa useState — por eso necesita "use client".
// Todo el árbol de componentes a partir de aquí es Client Component.
//
// LIMITACIÓN: No puedes exportar metadata desde un Client Component.
// Si necesitas SEO en esta página, crea un layout.js en app/contact/
// y exporta la metadata desde ahí (Server Component).
//
// PRÁCTICA RECOMENDADA en Next.js:
// En vez de hacer toda la página "use client", solo marcar el formulario:
//   app/contact/page.js → Server Component (con metadata)
//   components/ContactForm.js → "use client" (solo el form interactivo)
// Aquí hacemos todo el page "use client" para simplificar el ejemplo.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import ComponentBadge from '../../components/ComponentBadge'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Requerido'
    if (!form.email.includes('@')) errs.email = 'Email inválido'
    if (form.message.trim().length < 10) errs.message = 'Mínimo 10 caracteres'
    return errs
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    // En un proyecto real, harías fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
    console.log('Form data:', form)
    setSent(true)
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-16">
      <ComponentBadge type="client" />
      <h1 className="text-4xl font-bold mt-6 mb-2">Contact</h1>
      <p className="text-gray-400 text-sm mb-8">
        Esta página usa <code className="text-primary bg-surface px-1.5 py-0.5 rounded text-xs">useState</code> —
        por eso es un Client Component. El badge es azul.
      </p>

      {sent ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">✓</div>
          <p className="text-emerald-400 font-medium">¡Mensaje enviado!</p>
          <p className="text-gray-500 text-sm mt-2">(Demo — revisa la consola del browser)</p>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
            className="mt-6 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            Enviar otro
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className={`w-full bg-surface border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors ${
                errors.name ? 'border-red-500' : 'border-white/10'
              }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={`w-full bg-surface border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors ${
                errors.email ? 'border-red-500' : 'border-white/10'
              }`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Mensaje</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tu mensaje..."
              rows={4}
              className={`w-full bg-surface border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none ${
                errors.message ? 'border-red-500' : 'border-white/10'
              }`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-primary text-white font-medium py-3 rounded-lg hover:opacity-80 transition-opacity"
          >
            Enviar mensaje
          </button>
        </form>
      )}
    </section>
  )
}
