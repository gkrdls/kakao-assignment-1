const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const message = document.querySelector("#message");
const emptyMessage = document.querySelector("#empty-message");
const selectedDate = document.querySelector("#selected-date");
const previousDateButton = document.querySelector("#previous-date-button");
const nextDateButton = document.querySelector("#next-date-button");
const todayDateButton = document.querySelector("#today-date-button");
const weekView = document.querySelector("#week-view");
const filterTabs = document.querySelectorAll(".filter-tab");

const TODO_STORAGE_KEY = "dailyTodos";
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let todos = [];
let currentFilter = "all";
let currentDate = new Date();

function loadTodosFromStorage() {
  const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (savedTodos === null) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(savedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch {
    return [];
  }
}

function saveTodosToStorage() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getStartOfWeek(date) {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;

  startOfWeek.setDate(startOfWeek.getDate() - daysFromMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
}

function getTodoCountByDate(date) {
  const dateKey = formatDateKey(date);
  return todos.filter((todo) => todo.date === dateKey).length;
}

function updateSelectedDateText() {
  selectedDate.textContent = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(currentDate);
}

function renderWeekView() {
  const startOfWeek = getStartOfWeek(currentDate);
  const selectedDateKey = formatDateKey(currentDate);
  const todayKey = formatDateKey(new Date());

  weekView.innerHTML = "";

  WEEK_DAYS.forEach((dayName, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const dateKey = formatDateKey(date);
    const button = document.createElement("button");
    const todoCount = getTodoCountByDate(date);

    button.type = "button";
    button.className = "week-day";
    button.classList.toggle("selected", dateKey === selectedDateKey);
    button.classList.toggle("today", dateKey === todayKey);
    button.setAttribute("aria-pressed", String(dateKey === selectedDateKey));
    button.innerHTML = `
      <span class="week-day-name">${dayName}</span>
      <span class="week-day-date">${date.getDate()}</span>
      <span class="week-day-count">${todoCount}</span>
    `;

    button.addEventListener("click", () => {
      currentDate = date;
      updateSelectedDateText();
      renderWeekView();
      renderTodos();
    });

    weekView.append(button);
  });
}

function getFilteredTodos() {
  const selectedDateKey = formatDateKey(currentDate);
  const todosForSelectedDate = todos.filter((todo) => todo.date === selectedDateKey);

  if (currentFilter === "active") {
    return todosForSelectedDate.filter((todo) => !todo.isCompleted);
  }

  if (currentFilter === "completed") {
    return todosForSelectedDate.filter((todo) => todo.isCompleted);
  }

  return todosForSelectedDate;
}

function renderTodos() {
  const filteredTodos = getFilteredTodos();

  todoList.innerHTML = "";
  updateEmptyMessage(filteredTodos.length);

  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.className = todo.isCompleted ? "todo-item completed" : "todo-item";

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "todo-actions";
    actions.append(
      createActionButton("Edit", "edit-button", () => editTodo(todo.id)),
      createActionButton(todo.isCompleted ? "Undo" : "Done", "complete-button", () =>
        toggleTodoComplete(todo.id)
      ),
      createActionButton("Delete", "delete-button", () => deleteTodo(todo.id))
    );

    todoItem.append(todoText, actions);
    todoList.append(todoItem);
  });
}

function updateFilterTabStyles() {
  filterTabs.forEach((tab) => {
    const isSelectedTab = tab.dataset.filter === currentFilter;
    tab.classList.toggle("active", isSelectedTab);
    tab.setAttribute("aria-selected", String(isSelectedTab));
  });
}

function updateEmptyMessage(filteredTodoCount) {
  const emptyMessages = {
    all: "No todos for the selected date.",
    active: "No active todos for the selected date.",
    completed: "No completed todos for the selected date.",
  };

  emptyMessage.textContent = emptyMessages[currentFilter];
  emptyMessage.classList.toggle("visible", filteredTodoCount === 0);
}

function createActionButton(text, className, clickHandler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `todo-action ${className}`;
  button.textContent = text;
  button.addEventListener("click", clickHandler);

  return button;
}

function showMessage(text) {
  message.textContent = text;
}

function addTodo(text) {
  todos.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    date: formatDateKey(currentDate),
    isCompleted: false,
  });

  saveTodosToStorage();
  renderWeekView();
  renderTodos();
}

function editTodo(id) {
  const todoToEdit = todos.find((todo) => todo.id === id);

  if (!todoToEdit) {
    return;
  }

  const editedText = window.prompt("Edit todo", todoToEdit.text);

  if (editedText === null) {
    return;
  }

  const trimmedText = editedText.trim();

  if (trimmedText === "") {
    showMessage("Please enter todo text.");
    return;
  }

  todoToEdit.text = trimmedText;
  showMessage("");
  saveTodosToStorage();
  renderWeekView();
  renderTodos();
}

function toggleTodoComplete(id) {
  todos = todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      : todo
  );

  saveTodosToStorage();
  renderWeekView();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodosToStorage();
  renderWeekView();
  renderTodos();
}

function moveWeek(weekDifference) {
  currentDate.setDate(currentDate.getDate() + weekDifference * 7);
  currentDate = new Date(currentDate);
  updateSelectedDateText();
  renderWeekView();
  renderTodos();
}

function moveToToday() {
  currentDate = new Date();
  updateSelectedDateText();
  renderWeekView();
  renderTodos();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText === "") {
    showMessage("Please enter todo text.");
    todoInput.focus();
    return;
  }

  addTodo(todoText);
  todoInput.value = "";
  showMessage("");
  todoInput.focus();
});

previousDateButton.addEventListener("click", () => {
  moveWeek(-1);
});

nextDateButton.addEventListener("click", () => {
  moveWeek(1);
});

todayDateButton.addEventListener("click", () => {
  moveToToday();
});

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentFilter = tab.dataset.filter;
    updateFilterTabStyles();
    renderTodos();
  });
});

todos = loadTodosFromStorage();
updateSelectedDateText();
renderWeekView();
updateFilterTabStyles();
renderTodos();
