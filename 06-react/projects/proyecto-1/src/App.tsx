import { useState } from 'react'
import './assets/styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <p>Cantidad de clicks: {count}</p>
    </>
  )
}

export default App
