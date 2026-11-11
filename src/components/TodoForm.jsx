// Task 2: make this a controlled input. Clear it after a successful add.
import {useState} from "react";

export default function TodoForm({ onAdd }){

  const[text,setText]=useState("");

  function handleSubmit(e){
    e.preventDefault();
    if (!text.trim())return;
    onAdd(text);
    setText("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="What needs doing?" 
      aria-label="New todo" 
      value={text}
      onChange={(e)=> setText(e.target.value)} 
      />
      <button type="submit">Add</button>
    </form>
  );
}
