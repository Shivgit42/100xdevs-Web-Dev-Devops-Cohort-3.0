import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    console.log("above setinterval");
    setInterval(() => {
      setCount((c) => c + 1);
    }, 5000);
    setInterval(() => {
      setCount2((c) => c - 1);
    }, 8000);
  }, []); // this effect will rount on mount, because the dependency array is empty

  useEffect(() => {
    console.log("the count has updated to " + count);
  }, [count, count2]);

  return (
    <div>
      {count} {count2}
    </div>
  );
}

export default App;
