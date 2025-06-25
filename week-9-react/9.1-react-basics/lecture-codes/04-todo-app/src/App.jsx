import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "go to gym",
      description: "hit the gym regularly",
      done: false,
    },
  ]);

  function addTodo() {
    /*
    let newArray = [];
    for (let i = 0; i < todos.length; i++) {
      newArray.push(todos[i]);
    }
    newArray.push({
      title: "eat your protein",
      description: "eat your food properly",
      done: true,
    });

    setTodos(newArray);
    */

    setTodos([
      ...todos,
      {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        done: true,
      },
    ]);
  }

  return (
    <div>
      <input id="title" type="text" placeholder="title" />
      <input id="description" type="text" placeholder="description" />
      <button onClick={addTodo}>Add todo</button>
      {todos.map((todo) => (
        <Todo
          title={todo.title}
          description={todo.description}
          done={todo.done}
        />
      ))}
    </div>
  );
}

function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <h2>{props.done ? "true" : "false"}</h2>
    </div>
  );
}

export default App;
