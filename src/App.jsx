import { useEffect, useState } from "react";
import DailyDateNavigator from "./components/DailyDateNavigator";
import TodoFilter from "./components/TodoFilter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import WeeklyDateView from "./components/WeeklyDateView";
import {
  formatDateKey,
  getStartOfWeek,
  moveDateByDays,
} from "./utils/date";
import {
  loadTodosFromStorage,
  saveTodosToStorage,
} from "./utils/todoStorage";

function App() {
  // 함수형 초기화를 사용해 앱이 처음 실행될 때만 저장된 Todo를 불러옵니다.
  const [todos, setTodos] = useState(loadTodosFromStorage);
  // 선택한 필터는 Todo가 추가되거나 변경되어도 별도의 상태로 유지됩니다.
  const [selectedFilter, setSelectedFilter] = useState("all");
  // 날짜는 Todo의 date 값과 바로 비교할 수 있도록 YYYY-MM-DD 문자열로 관리합니다.
  const [selectedDate, setSelectedDate] = useState(() =>
    formatDateKey(new Date()),
  );
  // 주간 뷰는 현재 표시 중인 주의 월요일을 기준으로 관리합니다.
  const [weekStartDate, setWeekStartDate] = useState(() =>
    getStartOfWeek(formatDateKey(new Date())),
  );

  // Todo가 추가, 수정, 완료 또는 삭제될 때마다 전체 목록을 자동 저장합니다.
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  function handleAddTodo(todoText) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: todoText,
      isCompleted: false,
      date: selectedDate,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  }

  function handleEditTodo(todoId, editedText) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: editedText } : todo,
      ),
    );
  }

  function handleToggleTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo,
      ),
    );
  }

  function handleDeleteTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId),
    );
  }

  const todosForSelectedDate = todos.filter(
    (todo) => todo.date === selectedDate,
  );

  const completedTodoCount = todosForSelectedDate.filter(
    (todo) => todo.isCompleted,
  ).length;

  const filteredTodos = todosForSelectedDate.filter((todo) => {
    if (selectedFilter === "active") {
      return !todo.isCompleted;
    }

    if (selectedFilter === "completed") {
      return todo.isCompleted;
    }

    return true;
  });

  function handleMoveDate(dayDifference) {
    setSelectedDate((currentDate) => {
      const movedDate = moveDateByDays(currentDate, dayDifference);
      setWeekStartDate(getStartOfWeek(movedDate));
      return movedDate;
    });
  }

  function handleSelectDate(dateKey) {
    setSelectedDate(dateKey);
    setWeekStartDate(getStartOfWeek(dateKey));
  }

  function handleMoveWeek(weekDifference) {
    const dayDifference = weekDifference * 7;

    // 주를 이동해도 사용자가 보고 있던 요일은 그대로 유지합니다.
    setWeekStartDate((currentWeekStart) =>
      moveDateByDays(currentWeekStart, dayDifference),
    );
    setSelectedDate((currentDate) =>
      moveDateByDays(currentDate, dayDifference),
    );
  }

  return (
    <main className="min-h-screen px-5 py-12 sm:py-16">
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_24px_70px_rgba(45,31,84,0.10)] sm:p-9">
        <header className="mb-8">
          <p className="mb-2 text-xs font-extrabold tracking-[0.22em] text-[#672be0]">
            PRODUCTIVITY
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                오늘의 할 일
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                해야 할 일을 기록하고 하나씩 완료해 보세요.
              </p>
            </div>
            <p className="shrink-0 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-[#672be0]">
              {completedTodoCount} / {todosForSelectedDate.length} 완료
            </p>
          </div>
        </header>

        <DailyDateNavigator
          selectedDate={selectedDate}
          onMoveDate={handleMoveDate}
        />
        <WeeklyDateView
          todos={todos}
          selectedDate={selectedDate}
          weekStartDate={weekStartDate}
          onSelectDate={handleSelectDate}
          onMoveWeek={handleMoveWeek}
        />
        <TodoForm onAddTodo={handleAddTodo} />
        <TodoFilter
          selectedFilter={selectedFilter}
          onChangeFilter={setSelectedFilter}
        />
        <TodoList
          todos={filteredTodos}
          selectedFilter={selectedFilter}
          onEditTodo={handleEditTodo}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </section>
    </main>
  );
}

export default App;
