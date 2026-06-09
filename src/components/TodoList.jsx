import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const EMPTY_MESSAGES = {
  all: {
    title: "아직 등록된 할 일이 없어요.",
    description: "위 입력창에서 첫 번째 할 일을 추가해 보세요.",
  },
  active: {
    title: "진행 중인 할 일이 없어요.",
    description: "새로운 할 일을 추가하거나 완료 항목을 되돌려 보세요.",
  },
  completed: {
    title: "완료한 일이 없어요.",
    description: "할 일을 완료하면 이곳에서 확인할 수 있어요.",
  },
};

function TodoList({
  todos,
  selectedFilter,
  onEditTodo,
  onToggleTodo,
  onDeleteTodo,
}) {
  if (todos.length === 0) {
    const emptyMessage = EMPTY_MESSAGES[selectedFilter];

    return (
      <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 px-5 py-12 text-center">
        <p className="font-bold text-slate-700">{emptyMessage.title}</p>
        <p className="mt-1 text-sm text-slate-500">
          {emptyMessage.description}
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-3" aria-label="Todo 목록">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEditTodo={onEditTodo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedFilter: PropTypes.oneOf(["all", "active", "completed"]).isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
