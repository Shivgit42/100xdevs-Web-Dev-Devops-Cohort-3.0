import { useContext } from "react";
import { CountProvider, CountContext } from "./CountProvider";

const Parent = () => {
  return (
    <div>
      <CountProvider>
        <Value />
        <HandleButton />
      </CountProvider>
    </div>
  );
};

function HandleButton() {
  const { setCount } = useContext(CountContext);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
    </div>
  );
}

function Value() {
  const { count } = useContext(CountContext);

  return <p>{count}</p>;
}

export default Parent;
