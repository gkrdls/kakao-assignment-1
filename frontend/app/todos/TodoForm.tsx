"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import type { Todo } from "../types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

type TodoFormProps = {
  todo?: Todo;
  initialDate?: string;
};

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function TodoForm({ todo, initialDate }: TodoFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(todo?.title ?? "");
  const [completed, setCompleted] = useState(todo?.completed ?? false);
  const [date, setDate] = useState(todo?.date ?? initialDate ?? getToday());
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage("Todo 내용을 입력해주세요.");
      return;
    }

    const response = await fetch(`${apiUrl}/todos`, {
      method: todo ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo?.id,
        title: trimmedTitle,
        completed,
        date,
      }),
    });

    if (!response.ok) {
      setErrorMessage("Todo 저장 중 문제가 발생했습니다.");
      return;
    }

    router.push(`/todos?date=${date}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
      <label className="grid gap-2">
        <span className="font-semibold">할 일</span>
        <input
          className="rounded-md border border-gray-300 px-4 py-2"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="할 일을 입력하세요"
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(event) => setCompleted(event.target.checked)}
        />
        <span>완료 상태</span>
      </label>

      <label className="grid gap-2">
        <span className="font-semibold">날짜</span>
        <input
          type="date"
          className="rounded-md border border-gray-300 px-4 py-2"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        className="w-fit rounded-md bg-blue-600 px-4 py-2 font-semibold text-white"
      >
        {todo ? "수정하기" : "생성하기"}
      </button>
    </form>
  );
}

export default TodoForm;
