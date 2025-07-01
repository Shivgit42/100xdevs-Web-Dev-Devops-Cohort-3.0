import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css";
import { todosAtomFamily } from "./atoms";
import { useEffect } from "react";

function App() {
  return (
    <RecoilRoot>
      <UpdaterTodo />
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function UpdaterTodo() {
  const updateTodo = useSetRecoilState(todosAtomFamily(2));

  useEffect(() => {
    setInterval(() => {
      updateTodo({
        title: "new todo",
        description: "new todo",
      });
    }, 5000);
  }, []);
}

function Todo({ id }) {
  const todo = useRecoilValue(todosAtomFamily(id));

  return (
    <div>
      {todo.title}
      {", "} {todo.description}
    </div>
  );
}

export default App;
