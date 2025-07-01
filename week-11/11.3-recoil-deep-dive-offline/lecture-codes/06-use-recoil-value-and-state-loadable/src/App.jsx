import {
  RecoilRoot,
  useRecoilState,
  useRecoilValueLoadable,
  useRecoilStateLoadable,
} from "recoil";
import "./App.css";
import { todosAtomFamily } from "./atoms";

//We can also use Suspense, Error boundary => for loading and handling error
function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const todo = useRecoilValueLoadable(todosAtomFamily(id)); // value loadable
  // const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id)) state loadable

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
    return <div>Error while fetching the data from backend</div>;
  }
}

export default App;
