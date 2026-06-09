import PropTypes from "prop-types";
import { formatDateLabel, formatDateKey } from "../utils/date";

function DailyDateNavigator({ selectedDate, onMoveDate }) {
  const todayDateKey = formatDateKey(new Date());
  const isToday = selectedDate === todayDateKey;

  return (
    <section
      className="mb-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 p-3"
      aria-label="Todo 날짜 선택"
    >
      <button
        type="button"
        className="date-navigation-button"
        onClick={() => onMoveDate(-1)}
        aria-label="이전 날짜"
      >
        이전
      </button>

      <div className="text-center">
        <p className="text-xs font-bold text-[#672be0]">
          {isToday ? "오늘" : "선택한 날짜"}
        </p>
        <p className="mt-0.5 font-extrabold text-slate-800" aria-live="polite">
          {formatDateLabel(selectedDate)}
        </p>
      </div>

      <button
        type="button"
        className="date-navigation-button"
        onClick={() => onMoveDate(1)}
        aria-label="다음 날짜"
      >
        다음
      </button>
    </section>
  );
}

DailyDateNavigator.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onMoveDate: PropTypes.func.isRequired,
};

export default DailyDateNavigator;
