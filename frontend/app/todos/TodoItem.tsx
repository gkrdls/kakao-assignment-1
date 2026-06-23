"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Todo } from "../types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const router = useRouter();

  async function toggleTodo() {
    await fetch(`${apiUrl}/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
        date: todo.date,
      }),
    });

    router.refresh();
  }

  async function deleteTodo() {
    await fetch(`${apiUrl}/todos?id=${todo.id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <li className="rounded-md border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <p
          className={
            todo.completed
              ? "text-gray-400 line-through"
              : "font-medium text-gray-900"
          }
        >
          {todo.title}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleTodo}
            className="rounded-md border px-3 py-1 text-sm"
          >
            {todo.completed ? "되돌리기" : "완료"}
          </button>

          <Link
            href={`/todos/${todo.id}`}
            className="rounded-md border px-3 py-1 text-sm"
          >
            수정
          </Link>

          <button
            type="button"
            onClick={deleteTodo}
            className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}
