let todoList = {
  todos: [],

  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    //get number of completed todos
    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function (todo) {
      // if everything is true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        // Otherwise make everything true
        todo.completed = true;
      }
    });
  },
};

var handlers = {
  addTodo: function () {
    addTodoTextInput = document.getElementById("add-todo-text-input");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function () {
    var changeTodoPositionInput = document.getElementById(
      "change-todo-position-input"
    );
    var changeTodoTextInput = document.getElementById("change-todo-text-input");

    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },

  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleCompletedPositionInput = document.getElementById(
      "toggle-completed-position-input"
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput = "";
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  },
};

var view = {
  displayTodos: function () {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";

    todoList.todos.forEach(function (todo, position) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = `☑️ ${todo.todoText}`;
      } else {
        todoTextWithCompletion = `☐ ${todo.todoText}`;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.className = "delete-button";

    return deleteButton;
  },
  setUpEventListeners: function () {
    var todosUl = document.querySelector("ul");

    todosUl.addEventListener("click", function (event) {
      var elementClicked = event.target;

      if (elementClicked.className === "delete-button") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  },
};
view.setUpEventListeners();
