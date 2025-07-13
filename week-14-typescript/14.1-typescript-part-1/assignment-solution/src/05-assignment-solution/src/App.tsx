import "./App.css";
import { Todo, type TodoType } from "./Todo";

function App() {
  const todos: TodoType[] = [
    {
      title: "go to gym",
      description: "workout daily",
      done: true,
    },

    {
      title: "buy groceries",
      description: "buy mik and biscuits",
      done: false,
    },
  ];

  return (
    <div className="p-5">
      <h1>Todo List</h1>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
    </div>
  );
}

export default App;
