"use client";

import Link from "next/link";

export default function TodoItem({
  todo,
  onToggle = null,
  onLikeToggle = null,
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        {onToggle && (
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              onToggle({ id: todo.id, currentCompleted: todo.completed })
            }
            className="w-4 h-4 cursor-pointer"
          />
        )}

        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {onLikeToggle && (
          <button
            onClick={() =>
              onLikeToggle({ id: todo.id, currentLiked: todo.liked })
            }
            className={`px-2 py-1 ${
              todo.liked ? "bg-red-500" : "bg-gray-300"
            } text-white rounded cursor-pointer`}
          >
            {todo.liked ? "♥" : "♡"}
          </button>
        )}
        <Link href={`${todo.id}`}>
          <button className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer">
            상세보기
          </button>
        </Link>
      </div>
    </div>
  );
}
