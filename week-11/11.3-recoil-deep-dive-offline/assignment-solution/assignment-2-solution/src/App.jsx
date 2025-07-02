import { RecoilRoot, useRecoilValueLoadable } from "recoil";
import "./App.css";
import { todosAtomFamily } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const todo = useRecoilValueLoadable(todosAtomFamily(id));

  if (todo.state === "loading") {
    return <div>loading...</div>;
  } else if (todo.state === "hasValue") {
    return (
      <div>
        {todo.contents.title}
        {todo.contents.description}
      </div>
    );
  } else if (todo.state === "hasError") {
    return (
      <p>
        Error while fetching the data from backend: {todo.contents.message}{" "}
      </p>
    );
  }
}

export default App;
