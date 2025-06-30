import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CurrentCount count={count} />
      <Increase setCount={setCount} />
      <Decrease setCount={setCount} />
    </div>
  );
}

function CurrentCount({ count }) {
  return <div>{count}</div>;
}

function Increase({ setCount }) {
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
    </div>
  );
}

function Decrease({ setCount }) {
  return (
    <div>
      <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
    </div>
  );
}

export default App;
