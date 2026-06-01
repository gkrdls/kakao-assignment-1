const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const message = document.querySelector("#message");

let todos = [];

// 현재 Todo 배열을 기준으로 화면의 목록을 다시 그립니다.
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
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

renderTodos();
