const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const message = document.querySelector("#message");
const emptyMessage = document.querySelector("#empty-message");
const selectedDate = document.querySelector("#selected-date");
const previousDateButton = document.querySelector("#previous-date-button");
const nextDateButton = document.querySelector("#next-date-button");
const filterTabs = document.querySelectorAll(".filter-tab");

let todos = [];
let currentFilter = "all";
let currentDate = new Date();

// Date 객체를 Todo 저장과 비교에 사용하기 쉬운 YYYY-MM-DD 문자열로 바꿉니다.
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 화면 상단에 현재 선택된 날짜를 사용자가 읽기 쉬운 형식으로 표시합니다.
function updateSelectedDateText() {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(currentDate);

  selectedDate.textContent = formattedDate;
}

// 선택된 날짜와 필터에 맞는 Todo만 골라 화면에 보여줄 배열을 만듭니다.
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

// 현재 Todo 배열과 필터 상태를 기준으로 화면의 목록을 다시 그립니다.
function renderTodos() {
  todoList.innerHTML = "";

  const filteredTodos = getFilteredTodos();

  updateEmptyMessage(filteredTodos.length);

  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.className = todo.isCompleted ? "todo-item completed" : "todo-item";

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const editButton = createActionButton("수정", "edit-button", () => editTodo(todo.id));
    const completeButton = createActionButton(
      todo.isCompleted ? "취소" : "완료",
      "complete-button",
      () => toggleTodoComplete(todo.id)
    );
    const deleteButton = createActionButton("삭제", "delete-button", () => deleteTodo(todo.id));

    actions.append(editButton, completeButton, deleteButton);
    todoItem.append(todoText, actions);
    todoList.append(todoItem);
  });
}

// 현재 선택된 필터 탭에 active 클래스를 적용해 시각적으로 구분합니다.
function updateFilterTabStyles() {
  filterTabs.forEach((tab) => {
    const isSelectedTab = tab.dataset.filter === currentFilter;
    tab.classList.toggle("active", isSelectedTab);
    tab.setAttribute("aria-selected", String(isSelectedTab));
  });
}

// 필터 결과가 비어 있을 때 현재 상태에 맞는 안내 문구를 보여줍니다.
function updateEmptyMessage(filteredTodoCount) {
  const emptyMessages = {
    all: "선택한 날짜에 등록된 Todo가 없습니다.",
    active: "선택한 날짜에 진행 중인 Todo가 없습니다.",
    completed: "선택한 날짜에 완료된 Todo가 없습니다.",
  };

  emptyMessage.textContent = emptyMessages[currentFilter];
  emptyMessage.classList.toggle("visible", filteredTodoCount === 0);
}

// 버튼 생성 로직을 한곳에 모아 각 Todo 항목의 동작 버튼을 만듭니다.
function createActionButton(text, className, clickHandler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `todo-action ${className}`;
  button.textContent = text;
  button.addEventListener("click", clickHandler);

  return button;
}

// 안내 메시지를 표시하고, 필요할 때 빈 문자열로 지웁니다.
function showMessage(text) {
  message.textContent = text;
}

function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text,
    date: formatDateKey(currentDate),
    isCompleted: false,
  };

  todos.push(newTodo);
  renderTodos();
}

function editTodo(id) {
  const todoToEdit = todos.find((todo) => todo.id === id);

  if (!todoToEdit) {
    return;
  }

  const editedText = window.prompt("수정할 내용을 입력하세요.", todoToEdit.text);

  if (editedText === null) {
    return;
  }

  const trimmedText = editedText.trim();

  if (trimmedText === "") {
    showMessage("수정할 Todo 내용을 입력해 주세요.");
    return;
  }

  todoToEdit.text = trimmedText;
  showMessage("");
  renderTodos();
}

function toggleTodoComplete(id) {
  todos = todos.map((todo) => {
    if (todo.id !== id) {
      return todo;
    }

    return {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
  });

  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function moveDate(dayDifference) {
  currentDate.setDate(currentDate.getDate() + dayDifference);
  currentDate = new Date(currentDate);
  updateSelectedDateText();
  renderTodos();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText === "") {
    showMessage("Todo 내용을 입력해 주세요.");
    todoInput.focus();
    return;
  }

  addTodo(todoText);
  todoInput.value = "";
  showMessage("");
  todoInput.focus();
});

previousDateButton.addEventListener("click", () => {
  moveDate(-1);
});

nextDateButton.addEventListener("click", () => {
  moveDate(1);
});

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentFilter = tab.dataset.filter;
    updateFilterTabStyles();
    renderTodos();
  });
});

updateSelectedDateText();
updateFilterTabStyles();
renderTodos();
