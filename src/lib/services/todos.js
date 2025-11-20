const API_URL = "http://localhost:4001/todos";

/**할일 목록 조회 */
export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오는데 실패했습니다");
  }
  return await response.json();
};

/**할 일 상세 조회 */
export const fetchTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("할 일을 찾을 수 없습니다");
  }
  return await response.json();
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
