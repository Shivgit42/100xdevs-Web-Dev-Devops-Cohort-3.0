import useStore from "./useStore";

function Parent() {
  return (
    <div>
      <HandleButton />
      <Value />
    </div>
  );
}

function HandleButton() {
  const { increment, decrement } = useStore();

  //* Alternative way
  // const increment = useStore((state) => state.increment);
  // const decrement = useStore((state) => state.decrement);

  return (
    <div>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
}

function Value() {
  const { count } = useStore();
  return <p>{count}</p>;
}

export default Parent;
