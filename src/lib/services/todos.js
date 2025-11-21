const API_URL = "http://localhost:4001/todos";

console.log("🔥 활성화된 fetchTodos 파일:", import.meta.url);

/**할일 목록 조회 */
export const fetchTodos = async ({ page = 1 } = {}) => {
  console.log("fetchTodos 호출, 페이지:", page);
  const limit = 5;
  const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);

  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오는데 실패했습니다");
  }

  const totalCount = response.headers.get("X-Total-Count");
  const data = await response.json();
  const total = parseInt(totalCount || "0");
  return {
    todos: data,
    totalCount: total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    currentPage: page,
  };
};

/**할 일 상세 조회 */
export const fetchTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("할 일을 찾을 수 없습니다");
  }
  const data = await response.json();
  return data;
};

/**할 일 추가 */
export const addTodo = async (title) => {
  const newTodo = {
    title,
    completed: false,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) throw new Error("할 일을 추가하는데 실패했습니다.");
  return await response.json();
};

/** 할 일 삭제 */
export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("할 일을 삭제하는데 실패했습니다.");
  return true;
};

/** 할 일 완료 상태 토글 */
export const toggleTodoStatus = async ({ id, currentCompleted }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !currentCompleted,
    }),
  });

  if (!response.ok) {
    throw new Error("할 일 상태를 변경하는데 실패했습니다.");
  }

  return await response.json();
};

/** 좋아요 상태 토글 */
export const toggleTodoLike = async ({ id, currentLiked }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      liked: !currentLiked,
    }),
  });

  if (!response.ok) {
    throw new Error("좋아요 상태를 변경하는데 실패했습니다.");
  }

  return await response.json();
};
