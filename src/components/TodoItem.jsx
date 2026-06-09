import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

function TodoItem({ todo, onEditTodo, onToggleTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [validationMessage, setValidationMessage] = useState("");
  const editInputRef = useRef(null);

  // 수정 모드로 바뀌면 사용자가 바로 입력할 수 있도록 입력창에 초점을 둡니다.
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  function handleStartEditing() {
    setEditText(todo.text);
    setValidationMessage("");
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditText(todo.text);
    setValidationMessage("");
    setIsEditing(false);
  }

  function handleEditTextChange(event) {
    setEditText(event.target.value);

    if (validationMessage) {
      setValidationMessage("");
    }
  }

  function handleSaveEdit(event) {
    event.preventDefault();

    const trimmedEditText = editText.trim();

    if (!trimmedEditText) {
      setValidationMessage("수정할 내용을 입력해 주세요.");
      return;
    }

    onEditTodo(todo.id, trimmedEditText);
    setValidationMessage("");
    setIsEditing(false);
  }

  return (
    <li
      className={`rounded-2xl border p-4 transition ${
        todo.isCompleted
          ? "border-slate-200 bg-slate-50"
          : "border-violet-100 bg-violet-50/60"
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleSaveEdit}>
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 max-sm:grid-cols-2">
            <label className="sr-only" htmlFor={`edit-todo-${todo.id}`}>
              할 일 수정
            </label>
            <input
              ref={editInputRef}
              id={`edit-todo-${todo.id}`}
              type="text"
              value={editText}
              onChange={handleEditTextChange}
              className="min-w-0 rounded-lg border border-violet-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-[#672be0] focus:ring-4 focus:ring-violet-100 max-sm:col-span-2"
              aria-describedby={`edit-validation-${todo.id}`}
            />
            <button
              type="submit"
              className="rounded-lg bg-[#672be0] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#5520bd]"
            >
              저장
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              onClick={handleCancelEditing}
            >
              취소
            </button>
          </div>
          <p
            id={`edit-validation-${todo.id}`}
            className="mt-2 min-h-5 text-sm font-medium text-red-600"
            role="alert"
          >
            {validationMessage}
          </p>
        </form>
      ) : (
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 max-sm:grid-cols-1">
          <p
            className={`min-w-0 break-words leading-7 ${
              todo.isCompleted
                ? "text-slate-400 line-through"
                : "font-medium text-slate-800"
            }`}
          >
            {todo.text}
          </p>

          <div className="flex flex-wrap justify-end gap-2 max-sm:justify-start">
            <button
              type="button"
              className="todo-action-button"
              onClick={handleStartEditing}
            >
              수정
            </button>
            <button
              type="button"
              className="todo-action-button"
              onClick={() => onToggleTodo(todo.id)}
            >
              {todo.isCompleted ? "되돌리기" : "완료"}
            </button>
            <button
              type="button"
              className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-bold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
              onClick={() => onDeleteTodo(todo.id)}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
