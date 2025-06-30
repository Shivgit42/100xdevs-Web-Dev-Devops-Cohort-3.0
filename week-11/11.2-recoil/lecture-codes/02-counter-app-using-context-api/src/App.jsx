import "./App.css";
import { CountContext, CountContextProvider } from "./CountContextProvider";
import { useContext } from "react";

function App() {
  return (
    <div>
      <CountContextProvider>
        <Counter />
      </CountContextProvider>
    </div>
  );
}

function Counter() {
  return (
    <div>
      <CurrentCount />
      <Increase />
      <Decrease />
    </div>
  );
}

function CurrentCount() {
  const { count } = useContext(CountContext);
  return <div>{count}</div>;
}

function Increase() {
  const { setCount } = useContext(CountContext);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
    </div>
  );
}

function Decrease() {
  const { setCount } = useContext(CountContext);

  return (
    <div>
      <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
    </div>
  );
}

export default App;
