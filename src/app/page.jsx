"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import TodoList from "./_components/TodoList";
import { fetchTodos } from "@/lib/services/todos";
import { fetchTodos } from "@/lib/services/todos";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      const todos = await fetchTodos();
      setTodos(todos);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadTodos();
    }, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error.message}
      </div>
    );
  }

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
