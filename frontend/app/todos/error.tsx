"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold">문제가 발생했습니다.</h1>
      <p className="mt-2 text-gray-500">{error.message}</p>

      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white"
      >
        다시 시도
      </button>
    </main>
  );
}