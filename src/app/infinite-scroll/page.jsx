"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import useInfiniteTodos from "@/hooks/useInfiniteTodos";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TodoForm from "../_components/TodoForm";
import TodoItem from "../_components/TodoItem";

export default function InfiniteScrollPage() {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data: allTodos = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteTodos();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">무한 스크롤</h1>
      <div className="max-w-md mx-auto mt-8">
        <TodoForm />
        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>

        {status === "pending" && !isFetchingNextPage && (
          <div className="text-center p-4">로딩 중...</div>
        )}

        {status === "error" && (
          <div className="text-center p-4 text-red-500">
            에러 발생:{error.message}
          </div>
        )}

        <div className="border">
          {allTodos.length === 0 ? (
            <div className="p-4 text-center">할 일이 없습니다.</div>
          ) : (
            allTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}

          {hasNextPage && (
            <div ref={loadMoreRef} className="p-4 text-center">
              {isFetchingNextPage ? "로딩 중..." : "스크롤하여 더 불러오기"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
