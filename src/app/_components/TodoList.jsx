"use client";

import { useState } from "react";
import {
  fetchTodos,
  toggleTodoLike,
  toggleTodoStatus,
} from "../../lib/services/todos";
import TodoItem from "./TodoItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/Pagination";

export default function TodoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: todosData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos", "page", currentPage],
    queryFn: () => fetchTodos({ page: currentPage }),
    meta: {
      name: "todos 홈",
    },
  });

  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: toggleTodoStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: toggleTodoLike,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({
        queryKey: ["todos", "page", currentPage],
      });

      const previousTodos = queryClient.getQueryData([
        "todos",
        "page",
        currentPage,
      ]);

      queryClient.setQueryData(["todos", "page", currentPage], (old) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map((todo) =>
            todo.id === newTodo.id ? { ...todo, liked: !todo.liked } : todo
          ),
        };
      });

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["todos", "page", currentPage],
        context.previousTodos
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos", "page", currentPage],
      });
    },
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isPending) {
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

  const { todos, totalPages } = todosData;
  return (
    <div>
      <div className="border">
        {!todos || todos.length === 0 ? (
          <div className="p-4 text-center">할 일이 없습니다</div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleMutation.mutate}
              onLikeToggle={toggleLikeMutation.mutate}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
