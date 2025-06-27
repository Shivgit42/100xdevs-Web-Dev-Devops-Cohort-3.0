import { useEffect, useState } from "react";

function App() {
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setShowTimer((x) => !x);
    }, 5000);
  }, []);

  return <div>{showTimer && <Timer />}</div>;
}

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let clock = setInterval(() => {
      console.log("inside the clock");
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, []);

  return <div>{seconds} seconds elapsed</div>;
};

export default App;
