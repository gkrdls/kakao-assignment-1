const TODO_STORAGE_KEY = "dailyTodos";

export function loadTodosFromStorage() {
  const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (savedTodos === null) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(savedTodos);

    // 저장된 값이 Todo 배열이 아닐 경우 앱이 멈추지 않도록 빈 배열을 반환합니다.
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch {
    return [];
  }
}

export function saveTodosToStorage(todos) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}
