import React from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function StudentCard({ name, level, stack }) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p>Nivel: {level}</p>
      <p>Stack: {stack.join(', ')}</p>
    </article>
  )
}

function App() {
  const students = [
    { id: 1, name: 'Nico', level: 'Junior', stack: ['HTML', 'CSS', 'JS'] },
    { id: 2, name: 'Vale', level: 'Mid', stack: ['React', 'Node'] },
  ]

  return (
    <main>
      {students.map((student) => (
        <StudentCard key={student.id} {...student} />
      ))}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
