import PropTypes from "prop-types";
import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [todoText, setTodoText] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  function handleTodoTextChange(event) {
    setTodoText(event.target.value);

    // 사용자가 다시 입력하기 시작하면 이전 안내 메시지를 제거합니다.
    if (validationMessage) {
      setValidationMessage("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTodoText = todoText.trim();

    if (!trimmedTodoText) {
      setValidationMessage("할 일을 입력해 주세요.");
      return;
    }

    onAddTodo(trimmedTodoText);
    setTodoText("");
    setValidationMessage("");
  }

  return (
    <div className="mb-7">
      <form
        className="grid grid-cols-[1fr_auto] gap-3"
        onSubmit={handleSubmit}
      >
        <label className="sr-only" htmlFor="todo-input">
          새로운 할 일
        </label>
        <input
          id="todo-input"
          type="text"
          value={todoText}
          onChange={handleTodoTextChange}
          className="min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#672be0] focus:ring-4 focus:ring-violet-100"
          placeholder="새로운 할 일을 입력하세요"
          autoComplete="off"
          aria-describedby="todo-validation-message"
        />
        <button
          type="submit"
          className="rounded-xl bg-[#672be0] px-6 font-bold text-white transition hover:bg-[#5520bd] focus:outline-none focus:ring-4 focus:ring-violet-200"
        >
          추가
        </button>
      </form>

      <p
        id="todo-validation-message"
        className="mt-2 min-h-5 text-sm font-medium text-red-600"
        role="alert"
        aria-live="polite"
      >
        {validationMessage}
      </p>
    </div>
  );
}

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm;
