import { useState } from "react";
import TodoItem from "./TodoItem";

// define the todo components to manage the list of todos
const Todo = () => {
  //state to store the list of todos, it will have id, title, desc, and done status
  const [todos, setTodos] = useState([]);

  //state to store the input for the new title
  const [title, setTitle] = useState("");

  //state to store the input for description
  const [description, setDescription] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  }

  function handleAddTodo() {
    if (title.trim() && description.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: title.trim(),
          description: description.trim(),
          done: false,
        },
      ]);

      setTitle("");
      setDescription("");
    }
  }

  function handleUpdateTodo(id, updatedTodo) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  }

  function handleDeleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleToggleDone(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  return (
    <div>
      <h1>Todo App</h1>

      {/* Input field for adding a new title */}
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)} //update todo as the user types
        value={title} //bind input to the todo title state
        placeholder="title"
        onKeyDown={handleKeyDown}
      />

      {/* Input field for adding a new todo's description */}
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="description"
        onKeyDown={handleKeyDown}
      />

      {/* Button to add a new todo */}
      <button onClick={handleAddTodo}>Add todo</button>

      {/* Section to display the list of todos */}
      <div>
        {todos.length === 0 ? ( // conditional rendering - show message if no todos are there to display
          <p>No todos to display</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
              onToggleDone={handleToggleDone}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
