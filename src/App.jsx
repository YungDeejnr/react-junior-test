import { useRef, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Panel from "./components/Panel";

const seed = [
  { id: 1, text: "Learn useState", done: true },
  { id: 2, text: "Learn props", done: false },
];

export default function App() {
  const [todos, setTodos] = useState(seed);
   const nextId=useRef(Math.max(...seed.map((t)=>t.id))+1);

  // Task 1: the checkbox does nothing visible. Find out why and fix it.
  function toggleTodo(id) {
   setTodos((prev)=>
  prev.map((t)=>(t.id===id? {...t,done: !t.done}:t))
  );
  }

  // Task 2: add a todo (ignore empty / whitespace-only text)
  function addTodo(text) {
    const trimmed=text.trim();
    if(!trimmed) return;
    const todo={id:nextId.current++,text:trimmed,done:false};
    setTodos((prev)=>[...prev,todo]);
  }

  // Task 3: delete a todo
  function deleteTodo(id) {
    setTodos((prev)=>prev.filter((t)=>t.id !==id));
  }

  // Task 4: filter state ("all" | "active" | "done") and the filtered list
  const [filter, setFilter] = useState("all");
  // Task 5: number of items still active
  const itemsLeft= todos.filter((t)=>!t.done).length;

  const visibleTodos= todos.filter((t)=>{
    if(filter==="active") return !t.done;
    if(filter==="done") return t.done;
    return true;
  });


  return (
    <main style={{ maxWidth: 420, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Todos</h1>
      <TodoForm onAdd={addTodo} />
      {/* Task 4: three buttons: All / Active / Done */}
<div>
  <button onClick={() => setFilter("all")}>All</button>
  <button onClick={() => setFilter("active")}>Active</button>
  <button onClick={() => setFilter("done")}>Done</button>
</div>


      {/* Task 7: wrap the list in <Panel title="Your todos"> and pass the
          items-left text (Task 5) as the Panel's footer. */}
      
      {/* Task 5: "2 items left" / "1 item left" / "0 items left" */}
      <Panel
  title="Your todos"
  footer={<p>{`${itemsLeft} ${itemsLeft === 1 ? "item" : "items"} left`}</p>}
>
  <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
</Panel>
      
    </main>
  );
}
