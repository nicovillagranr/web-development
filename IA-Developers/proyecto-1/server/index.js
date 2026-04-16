import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Base de datos en memoria
let todos = [];
let nextId = 1;

// Obtener todos los todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Crear un todo
app.post("/api/todos", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "El título es requerido" });
  }

  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// Actualizar un todo
app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo no encontrado" });
  }

  if (req.body.title !== undefined) todo.title = req.body.title.trim();
  if (req.body.completed !== undefined) todo.completed = req.body.completed;

  res.json(todo);
});

// Eliminar un todo
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo no encontrado" });
  }

  todos.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
