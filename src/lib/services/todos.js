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
