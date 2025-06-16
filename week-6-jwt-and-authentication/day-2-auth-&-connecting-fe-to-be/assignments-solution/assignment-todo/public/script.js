//? Navigating functions to switch between signup and signin views

//signup page - show signup, hide signin and todos
function switchToSignup() {
  document.getElementById("signup-container").style.display = "block";
  document.getElementById("signin-container").style.display = "none";
  document.getElementById("todos-container").style.display = "none";
}

function switchToSignin() {
  document.getElementById("signin-container").style.display = "block";
  document.getElementById("signup-container").style.display = "none";
  document.getElementById("todos-container").style.display = "none";
}

function showTodoApp() {
  document.getElementById("todos-container").style.display = "block";
  document.getElementById("signup-container").style.display = "none";
  document.getElementById("signin-container").style.display = "none";

  getTodos();
}

//function to handle user signup
async function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await axios.post("http://localhost:3000/signup", {
      username,
      password,
    });

    alert(response.data.message);

    if (response.data.message === "You have successfully signed up") {
      switchToSignin();
    }
  } catch (err) {
    console.error("Error while signing up", err);
  }
}

//function to handle user signin
async function signin() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  try {
    const response = await axios.post("http://localhost:3000/signin", {
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
      showTodoApp();
    } else {
      alert(response.data.message);
    }
  } catch (err) {
    console.error("Error while signing in", err);
  }
}

//function to handle user logout
async function logout() {
  localStorage.removeItem("token");
  document.getElementById("signin-username").value = "";
  document.getElementById("signin-password").value = "";
  alert("You are logged out sucessfully");
  switchToSignin();
}

//function to fetch and display todos
async function getTodos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/todos", {
      headers: {
        token: token,
      },
    });

    const todoList = document.getElementById("todos-list-container");
    todoList.innerHTML = "";

    //if there are todos, create element for each
    if (response.data.length) {
      response.data.forEach((todo) => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
      });
    }
  } catch (err) {
    console.error("Error while fetching todo", err);
  }
}

//function to add a new todo
async function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const title = todoInput.value;

  if (title.trim() === "") {
    alert("Please write something to add to the todo list");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/todos",
      {
        title,
      },
      {
        headers: {
          token: token,
        },
      }
    );

    todoInput.value = "";

    // Refresh the list of To-Dos
    getTodos();
  } catch (err) {
    console.error("Error while adding a new todo item:", err);
  }
}

//function to update an existing todo
async function updateTodo(id, newTitle) {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:3000/todos/${id}`,
      {
        title: newTitle,
      },
      {
        headers: {
          token: token,
        },
      }
    );

    //refresh the list of todos
    getTodos();
  } catch (err) {
    console.error("Error while updating todo", err);
  }
}

//function to mark todo as done/undone
async function markTodo(id) {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:3000/todos/${id}/done`, {
      headers: { token: token },
    });
    //refresh the list of todos
    getTodos();
  } catch (err) {
    console.error("Error while marking todo status", err);
  }
}

//function to delete todo
async function deleteTodo(id) {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`, {
      headers: { token: token },
    });
    //refresh the list of todos
    getTodos();
  } catch (err) {
    console.error("Error while deleting todo", err);
  }
}

//function to create todo element and display
function createTodoElement(todo) {
  //create a container for todo-item
  const todoDiv = document.createElement("div");
  todoDiv.className = "todo-item";

  //create an input element for the todo title
  const inputElem = createInputElement(todo.title);
  inputElem.readOnly = true;

  //create edit, delete and done checkbox elemnents
  const editBtn = createEditButton(inputElem, todo.id);
  const deleteBtn = createDeleteButton(todo.id);
  const markCheckbox = createMarkCheckbox(todo.done, todo.id, inputElem);

  //Append the created elements to the todo div
  todoDiv.appendChild(inputElem);
  todoDiv.appendChild(markCheckbox);
  todoDiv.appendChild(editBtn);
  todoDiv.appendChild(deleteBtn);

  return todoDiv;
}

//function to create an input elem for todo title
function createInputElement(value) {
  const inputElem = document.createElement("input");
  inputElem.type = "text";
  inputElem.value = value;
  inputElem.readOnly = true;

  return inputElem;
}

//function to create an edit button to update todo
function createEditButton(inputElem, id) {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  //handle buttton click
  editBtn.onclick = function () {
    if (inputElem.readOnly) {
      //make input editable and change button text to "Save"
      inputElem.readOnly = false;
      editBtn.textContent = "Save";
      editBtn.classList.add("save");
      inputElem.focus();
      inputElem.style.outline = "1px solid #667eea";
    } else {
      //make input readonly and change button text to "Edit"
      inputElem.readOnly = true;
      editBtn.textContent = "Edit";
      editBtn.classList.remove("save");
      inputElem.style.outline = "none";
      updateTodo(id, inputElem.value);
    }
  };

  return editBtn;
}

//create a delete button for todo-item
function createDeleteButton(id) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {
    deleteTodo(id);
  };
  return deleteBtn;
}

async function markTodoDone(id, done) {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:3000/todos/${id}/done`,
      {},
      {
        headers: { token: token },
      }
    );
    //refresh the list of todos
    getTodos();
  } catch (err) {
    console.error("Error while marking todo status", err);
  }
}

//function to mark done the todo as done/undone
function createMarkCheckbox(done, id, inputElem) {
  const markCheckbox = document.createElement("input");
  markCheckbox.type = "checkbox";
  markCheckbox.checked = done;

  inputElem.style.textDecoration = done ? "line-through" : "none";

  markCheckbox.onchange = function () {
    markTodoDone(id, markCheckbox.checked);
    inputElem.style.textDecoration = markCheckbox.checked
      ? "line-through"
      : "none";
  };
  return markCheckbox;
}
