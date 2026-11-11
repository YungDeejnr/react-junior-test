// Task 6: there is a React warning-level smell in this file. Find and fix it.
export default function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
            aria-label={`Toggle ${todo.text}`}
          />
          <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.text}
          </span>
          <button onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.text}`}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
