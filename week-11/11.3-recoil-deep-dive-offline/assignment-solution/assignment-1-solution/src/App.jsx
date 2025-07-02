import { RecoilRoot, useRecoilValue } from "recoil";
import "./App.css";
import { todosAtomFamily } from "./atoms";
import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<p>loading...</p>}>
        <ErrorBoundary>
          <Todo id={1} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Todo id={2} />
        </ErrorBoundary>
      </Suspense>
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const todo = useRecoilValue(todosAtomFamily(id));

  return (
    <div>
      {todo.title}
      {todo.description}
    </div>
  );
}

export default App;
