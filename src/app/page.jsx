"use client";
import Image from "next/image";
import { useState } from "react";
import TodoList from "./_components/TodoList";

const initialTodos = [
  {
    id: 1,
    title: "할 일 1",
    completed: false,
  },
  {
    id: 2,
    title: "할 일 2",
    completed: true,
  },
  {
    id: 3,
    title: "할 일 3",
    completed: false,
  },
];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  const loadTodos = async () => {};
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">
        투두리스트
      </h1>
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}
