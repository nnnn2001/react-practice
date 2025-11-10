"use client";

import { fetchTodo } from "@/lib/services/todos";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TodoDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [todo, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodoDetail = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTodo(id);
        setTodos(data);
      } catch (error) {
        console.error("할 일 상세 정보를 가져오는 중 오류 발생", error);
        setError("할 일 상세 정보를 가져오는데 실패했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodoDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto mt-8">
        <button
          onClick={() => router.push("/")}
          className="mb-4 px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          목록으로 돌아가기
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">할 일 상세</h1>
          <div className="mb-4">
            <h1 className="text-lg font-semibold">제목</h1>
            <p className="mt-2 p-2 bg-gray-100 rounded">{todo?.title}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">상태</h2>
            <p className="mt-2 p-2 bg-gray-100 rounded">
              {todo?.completed ? "완료됨" : "미완료"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
