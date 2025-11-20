"use client";

import { fetchTodos, toggleTodoStatus } from "../../lib/services/todos";
import TodoItem from "./TodoItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function TodoList() {
  const {
    data: todos,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const queryClient = useQueryClient();
  const toggleMutation = useMutation({
    mutationFn: toggleTodoStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        로딩 중...
        <div>
          <button>할일 목록 불러오기</button>
        </div>
      </div>
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
    <div className="border">
      {todos.length === 0 ? (
        <div className="p-4 text-center">할 일이 없습니다</div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleMutation.mutate}
          />
        ))
      )}
    </div>
  );
}
