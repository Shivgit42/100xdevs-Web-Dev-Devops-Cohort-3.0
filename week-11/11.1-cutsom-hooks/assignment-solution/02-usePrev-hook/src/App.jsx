import { useState } from "react";
import "./App.css";
import { usePrev } from "./hooks/usePrev";

function App() {
  const [count, setCount] = useState(0);
  const [anything, setAnything] = useState(false);
  const prev = usePrev(count); //track the previous count value

  function triggerRerender() {
    setAnything(!anything);
  }

  return (
    <div>
      <h1>Counter with usePrev Hook</h1>
      <p>Current count: {count}</p>
      <p>Previous count: {prev}</p>

      {/* this setCount will trigger re-render and app components re-render */}
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => setCount((c) => c + 1)}>Increase</button>
        <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
        <button onClick={triggerRerender}>Casue the glitch</button>
      </div>
    </div>
  );
}

export default App;
