"use client";

import { addTodo } from "@/lib/services/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { mutate: mutateAddTodo, isPending: isAdding } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("할 일 추가 중 오류 발생:", error);
      alert("할 일을 추가하는데 실패했습니다.");
    },
    onSettled: () => {
      setTitle("");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    mutateAddTodo(title);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="grow p-2 border"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          {isAdding ? "추가중..." : "추가"}
        </button>
      </div>
    </form>
  );
}
