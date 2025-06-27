import { useEffect, useState } from "react";

function App() {
  const [isComponentShown, setIsComponentShown] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsComponentShown((x) => !x);
    }, 5000);
  }, []);

  return <div>{isComponentShown && <MyComponent />}</div>;
}

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("component mounted or count updated");
  }, [count]);

  useEffect(() => {
    console.log("component mounted");

    return () => {
      console.log("component unmounted");
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
