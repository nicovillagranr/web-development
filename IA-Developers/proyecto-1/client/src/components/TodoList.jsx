function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">No hay tareas</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <span onClick={() => onToggle(todo.id)}>{todo.title}</span>
          <button onClick={() => onDelete(todo.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
