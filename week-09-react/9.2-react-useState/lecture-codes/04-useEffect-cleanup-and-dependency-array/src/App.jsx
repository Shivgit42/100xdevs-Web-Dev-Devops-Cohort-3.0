import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <div>
      <Counter count={count} count2={count2} />
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <button onClick={() => setCount2(count2 - 1)}>Decrease count</button>
    </div>
  );
}

function Counter(props) {
  useEffect(() => {
    console.log("on mount");

    return () => {
      console.log("on unmount");
    };
  }, []);

  useEffect(() => {
    console.log("count has changed"); // this will get called first when component mounts and then get called only after cleanup function because it has a dependency

    return () => {
      console.log("cleanup inside second effect"); //first this will get called for the original thing which is log above it and then above log will call for the new thing
    };
  }, [props.count]);

  return (
    <div>
      Counter {props.count} <br />
      Counter {props.count2}
    </div>
  );
}

export default App;
