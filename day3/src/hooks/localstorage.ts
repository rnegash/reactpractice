import { useEffect, useState } from "react";
import type { ToDo } from "../types";

export const useLocalStorage = () => {
  const [todos, setTodos] = useState<ToDo[] | null>();

  useEffect(() => {
    const items = localStorage.getItem("todos");

    items && setTodos(JSON.parse(items));
  }, []);

  useEffect(() => {
    if (todos) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  return [todos, setTodos] as const;
};
