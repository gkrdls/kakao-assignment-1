import type { Todo } from "./types";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000";

export async function getTodos(date?: string): Promise<Todo[]> {
  const url = new URL(`${backendUrl}/todos`);

  if (date) {
    url.searchParams.set("date", date);
  }

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Todo 목록을 불러오지 못했습니다.");
  }

  return response.json();
}

export async function getTodoById(todoId: number): Promise<Todo | null> {
  const todos = await getTodos();

  return todos.find((todo) => todo.id === todoId) ?? null;
}
