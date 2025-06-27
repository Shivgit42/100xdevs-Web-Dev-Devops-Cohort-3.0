import { useEffect, useState } from "react";

function App() {
  let [isCounterVisible, setIsCounterVisible] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsCounterVisible((c) => !c);
    }, 5000);
  }, []);

  return (
    <div>
      hi
      {isCounterVisible && <Counter />}
      hello
    </div>
  );
}

//mounting, re-rendering, unmounting
function Counter() {
  const [count, setCount] = useState(0);

  // hooking into the lifecycle events of react
  // I will use useEffect only when component mounts

  //gaurd set-intervals from re-rendering
  useEffect(() => {
    console.log("on mount");
    let clock = setInterval(() => {
      console.log("from inside setinterval");
      setCount((count) => count + 1);
    }, 1000);

    return function () {
      console.log("on unmount");
      clearInterval(clock);
    };
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App;
