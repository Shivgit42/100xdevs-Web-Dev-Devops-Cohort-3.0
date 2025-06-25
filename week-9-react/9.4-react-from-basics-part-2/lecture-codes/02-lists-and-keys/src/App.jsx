function App() {
  /*
  return <div>{[<Todo key={2} title={"Eat food"} done={true} />]}</div>;
}

function Todo({ title, done }) {
  return (
    <div>
      {title} - {done ? "Done" : "Not Done"}
    </div>
  );
  */

  const todos = [
    { title: "Get out of bed", done: true },
    { title: "Brush teeth", done: false },
    { title: "Go to the gym", done: false },
    { title: "Eat breakfast", done: true },
  ];

  const items = [
    { id: "1", name: "Item1" },
    { id: "2", name: "Item2" },
    { id: "3", name: "Item3" },
  ];

  return (
    <div>
      {todos.map((todo, index) => (
        <Todo key={index} title={todo.title} done={todo.done} />
      ))}
      <ItemList items={items} />
    </div>
  );
}

function Todo({ title, done }) {
  return (
    <div>
      {title} - {done ? "Done" : "Not done"}
    </div>
  );
}

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li>
          {item.id}
          {item.name}{" "}
        </li>
      ))}
    </ul>
  );
}

export default App;
