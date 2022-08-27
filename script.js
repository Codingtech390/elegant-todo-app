// Selectors

// 1: Grab everything here:

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// 5(a):

const filterOption = document.querySelector(".filter-todo");

//  Event Listener

// 6(c)
document.addEventListener("DOMContentLoaded", getTodos);

// 2: Add a listener
todoButton.addEventListener("click", addTodo);

// 3(b)

todoList.addEventListener("click", deleteCheck);

// 5(a)

filterOption.addEventListener("click", filterTodo);

//Functions

// 2(a): Create the addTodo function

function addTodo(event) {
  //(a:1) Prevent form from submitting
  event.preventDefault();

  // (a:2) Create the todo DIV and add the class

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // (a:3) Create the LI and add the data and add the classlist

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  // (a:4) Grab the newTodo and stick it to todoDiv
  todoDiv.appendChild(newTodo);

  // 6(b) Add the function before setting the data to blank.
  saveToLocalStorage(todoInput.value);

  // (a:5) Create the buttons, Checked and Delete
  // (a:5) Create the button, add the check and delete icon, add a classlist and stick it to the todoDiv

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // (a:6) Finally appned the list to todoDiv and clear the data from input value

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

// 3(a) Enable delete button and check button

// 3(b) Make a new listener for delete button that will execute the deleteCheck Function

function deleteCheck(e) {
  //   console.log(e.target); // To check the targets

  // 3(b.a) Store the target in a variable
  const item = e.target;

  // 3(b.b) Delete todo

  if (item.classList[0] === "trash-btn") {
    // grab the target's parent element and add a classlist of fall
    const todo = item.parentElement;

    // 4(a):  Add the classes and animations
    todo.classList.add("fall");

    // 6(d) Remove local todos
    removeLocalTodos(todo);

    // 4(b) Setup a listener that will wait for the transition to end and then remove the todo.
    todo.addEventListener("transition-end", (e) => {
      todo.remove();
    });
  }

  // Check button

  if (item.classList[0] === "complete-btn") {
    // grab the target's parent element
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

// 5(a):  Add functions for All, Completed, Incomplete to make filters work

function filterTodo(e) {
  const todos = todoList.childNodes;
  // loop over to all the childNode

  todos.forEach(function (todo) {
    switch (e.target.value) {
      // Declare all cases here
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// 6(a) Save it to local storage
// 6(b) Add the function before setting the data to blank.

function saveToLocalStorage(todo) {
  // Check if it is blank or it have data already

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Grab the todos and push it back
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 6(d) Remove local todos

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Get the index value of a particular todo so that we can delete it

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 6(c) If there is a todo

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Attach final todo
    todoList.appendChild(todoDiv);
  });
}
