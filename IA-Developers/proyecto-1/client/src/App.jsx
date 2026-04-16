import { useState, useEffect } from "react";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

const API_URL = "http://localhost:3001/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    const todo = await res.json();
    setTodos([...todos, todo]);
    setNewTitle("");
  }

  async function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <h1>Todo App</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button type="submit">Agregar</button>
      </form>

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
