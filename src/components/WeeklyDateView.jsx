import PropTypes from "prop-types";
import {
  formatDateKey,
  getWeekDates,
  WEEKDAY_LABELS,
} from "../utils/date";

function WeeklyDateView({
  todos,
  selectedDate,
  weekStartDate,
  onSelectDate,
  onMoveWeek,
}) {
  const todayDateKey = formatDateKey(new Date());
  const weekDates = getWeekDates(weekStartDate);

  return (
    <section className="mb-6" aria-label="주간 Todo 보기">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          className="week-navigation-button"
          onClick={() => onMoveWeek(-1)}
        >
          저번 주
        </button>
        <p className="text-xs font-semibold text-slate-500">
          날짜를 선택해 할 일을 확인하세요
        </p>
        <button
          type="button"
          className="week-navigation-button"
          onClick={() => onMoveWeek(1)}
        >
          다음 주
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 overflow-x-auto pb-1">
        {weekDates.map((dateKey, index) => {
          const todoCount = todos.filter(
            (todo) => todo.date === dateKey,
          ).length;
          const isSelected = dateKey === selectedDate;
          const isToday = dateKey === todayDateKey;
          const dayNumber = Number(dateKey.slice(-2));

          return (
            <button
              key={dateKey}
              type="button"
              className={`week-date-button ${
                isSelected ? "week-date-button-selected" : ""
              } ${isToday ? "week-date-button-today" : ""}`}
              onClick={() => onSelectDate(dateKey)}
              aria-pressed={isSelected}
              aria-label={`${dateKey}, Todo ${todoCount}개`}
            >
              <span className="text-xs font-bold">
                {WEEKDAY_LABELS[index]}
              </span>
              <span className="text-lg font-black">{dayNumber}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-violet-100 text-[#672be0]"
                }`}
              >
                {todoCount}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

WeeklyDateView.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedDate: PropTypes.string.isRequired,
  weekStartDate: PropTypes.string.isRequired,
  onSelectDate: PropTypes.func.isRequired,
  onMoveWeek: PropTypes.func.isRequired,
};

export default WeeklyDateView;
