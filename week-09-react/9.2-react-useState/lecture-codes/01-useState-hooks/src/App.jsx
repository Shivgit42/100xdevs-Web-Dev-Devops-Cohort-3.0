import { useState } from "react";

function App() {
  return (
    <div>
      useStateHooks
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  console.log("inside counter component");

  setInterval(() => {
    setCount(count + 1);
  }, 1000);

  function increaseCount() {
    setCount(count + 1);
  }

  function decreaseCount() {
    setCount(count - 1);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>Increase counter</button>
      <button onClick={decreaseCount}>Decrease count</button>
      <button onClick={resetCount}>Reset count</button>
    </div>
  );
}

export default App;
