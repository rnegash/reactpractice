import { useRef } from "react";

import "./App.css";
import { useLocalStorage } from "./hooks/localstorage";
import type { ToDo } from "./types";

const handleTodos = (input: string, todos: ToDo[] | null | undefined) => {
  const newTodo: ToDo = {
    id: todos?.length || 0,
    content: input,
  };
  return Array.isArray(todos) ? [...todos, newTodo] : [newTodo];
};

function App() {
  const [todos, setTodos] = useLocalStorage();

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="add-todo">
          <label>
            Add todo
            <input ref={inputRef} type="text" />
          </label>
          <button
            onClick={() =>
              setTodos(handleTodos(inputRef.current?.value || "", todos))
            }
          >
            add
          </button>
        </div>

        {todos && (
          <ul>
            {todos?.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
