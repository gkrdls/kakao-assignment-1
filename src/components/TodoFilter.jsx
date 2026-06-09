import PropTypes from "prop-types";

const TODO_FILTERS = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

function TodoFilter({ selectedFilter, onChangeFilter }) {
  return (
    <div
      className="mb-5 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1"
      role="tablist"
      aria-label="Todo 상태 필터"
    >
      {TODO_FILTERS.map((filter) => {
        const isSelected = selectedFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${
              isSelected
                ? "bg-[#672be0] text-white shadow-sm"
                : "text-slate-500 hover:bg-white hover:text-[#672be0]"
            }`}
            onClick={() => onChangeFilter(filter.value)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

TodoFilter.propTypes = {
  selectedFilter: PropTypes.oneOf(["all", "active", "completed"]).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default TodoFilter;
