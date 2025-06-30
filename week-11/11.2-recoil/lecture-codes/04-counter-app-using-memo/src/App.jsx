import "./App.css";
import { useState, useEffect, memo } from "react";

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 3000);
  });

  return (
    <div>
      <CurrentCount count={count} />
      <Increase />
      <Decrease />
    </div>
  );
}

const CurrentCount = memo(function ({ count }) {
  return <div>{count}</div>;
});

const Increase = memo(function () {
  return (
    <div>
      <button onClick={() => "hi"}>Increase</button>
    </div>
  );
});

const Decrease = memo(function () {
  return (
    <div>
      <button onClick={() => "hi"}>Decrease</button>
    </div>
  );
});

export default App;
