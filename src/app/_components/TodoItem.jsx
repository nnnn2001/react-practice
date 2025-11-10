"use client";

import Link from "next/link";

export default function TodoItem({ todo }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </span>
      </div>
      <Link href={`${todo.id}`}>
        <button className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer">상세보기</button>
      </Link>
    </div>
  );
}
