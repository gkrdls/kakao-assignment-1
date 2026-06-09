export const WEEKDAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function moveDateByDays(dateKey, dayDifference) {
  const movedDate = parseDateKey(dateKey);
  movedDate.setDate(movedDate.getDate() + dayDifference);

  return formatDateKey(movedDate);
}

export function getStartOfWeek(dateKey) {
  const date = parseDateKey(dateKey);
  const day = date.getDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;

  date.setDate(date.getDate() - daysFromMonday);
  return formatDateKey(date);
}

export function getWeekDates(weekStartDate) {
  return Array.from({ length: 7 }, (_, index) =>
    moveDateByDays(weekStartDate, index),
  );
}

export function formatDateLabel(dateKey) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(parseDateKey(dateKey));
}
