"use client";

import { useState } from "react";

export default function TodoForm() {
  const [title, setTitle] = useState / "";

  const handleAddTodo = async (title) => {
    try {
      await addTodo(title);
    } catch (error) {
      console.error("할 일 추가 중 오류 발생", error);
      setError("할 일을 추가하는데 실패했습니다");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await handleAddTodo(title);
      setTitle("");
    } catch (error) {
      console.error("할 일 추가 중 오류 발생", error);
    }
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
          추가
        </button>
      </div>
    </form>
  );
}
