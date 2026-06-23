import Link from "next/link";
import { getTodos } from "../actions";
import TodoItem from "./TodoItem";

type TodosPageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const { date } = await searchParams;
  const selectedDate = date ?? getToday();
  const todos = await getTodos(selectedDate);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">Todo List</p>
            <h1 className="mt-2 text-3xl font-bold">오늘의 할 일</h1>
            <p className="mt-2 text-sm text-gray-500">{selectedDate}</p>
          </div>

          <Link
            href={`/todos/new?date=${selectedDate}`}
            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            새 Todo
          </Link>
        </header>

        <form className="mb-6 flex items-end gap-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">날짜 선택</span>
            <input
              type="date"
              name="date"
              defaultValue={selectedDate}
              className="rounded-md border border-gray-300 bg-white px-4 py-2"
            />
          </label>

          <button
            type="submit"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold"
          >
            조회
          </button>
        </form>

        {todos.length === 0 ? (
            <section className="rounded-md border border-gray-200 bg-white p-6">
                <p className="text-gray-500">선택한 날짜에 등록된 Todo가 없습니다.</p>
            </section>
        ):(
            <ul className="grid gap-3">
                {todos.map((todo)=>(
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        )}
      </div>
    </main>
  );
}
