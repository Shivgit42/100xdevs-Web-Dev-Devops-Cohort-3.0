import { useState } from "react";
import "./App.css";

function useCounter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return {
    count,
    increment,
  };
}

function App() {
  const { count, increment } = useCounter();

  return (
    <div>
      <button onClick={increment}>Increase {count}</button>
    </div>
  );
}

export default App;
