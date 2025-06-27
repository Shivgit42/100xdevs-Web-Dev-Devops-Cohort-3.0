import { useEffect, useState } from "react";

function App() {
  return (
    <div>
      useEffect Hooks
      <Counter />
    </div>
  );
}

//mounting, re-rendering, unmounting
function Counter() {
  const [count, setCount] = useState(0);

  console.log("inside counter component");

  // hooking into the lifecycle events of react
  // I will use useEffect only when component mounts

  //gaurd set-intervals from re-rendering
  useEffect(() => {
    setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    console.log("mounted");
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App;
