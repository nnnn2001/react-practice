"use client";

import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  console.log("todos:", todos);
  return (
    <div className="border">
      {todos.length === 0 ? (
        <div className="p-4 text-center">할 일이 없습니다</div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
}