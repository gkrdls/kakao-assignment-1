import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodoById } from "../../actions";
import TodoForm from "../TodoForm";

type EditTodoPageProps = {
  params: Promise<{
    todoId: string;
  }>;
};

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { todoId } = await params;
  const Id = Number(todoId);

  if (Number.isNaN(Id)) {
    notFound();
  }

  const todo = await getTodoById(Id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10 bg-gray-50 text-gray-900">
      <Link href="/todos" className="text-sm font-semibold text-blue-600">
        목록으로 돌아가기
      </Link>

      <h1 className="mt-6 text-3xl font-bold">Todo 수정하기</h1>

      <TodoForm todo={todo} />
    </main>
  );
}