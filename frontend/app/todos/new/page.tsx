import Link from "next/link";
import TodoForm from "../TodoForm";

type NewTodoPageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function NewTodoPage({ searchParams }: NewTodoPageProps) {
  const { date } = await searchParams;

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10 bg-gray-50 text-gray-900">
      <Link
        href={date ? `/todos?date=${date}` : "/todos"}
        className="text-sm font-semibold text-blue-600"
      >
        목록으로 돌아가기
      </Link>

      <h1 className="mt-6 text-3xl font-bold">새 Todo 만들기</h1>
      <TodoForm initialDate={date} />
    </main>
  );
}
