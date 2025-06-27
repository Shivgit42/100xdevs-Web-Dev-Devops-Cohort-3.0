import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";

const count = atom({
  key: "countState",
  default: 0,
});

function Parent() {
  return (
    <RecoilRoot>
      <Value />
      <HandleButton />
    </RecoilRoot>
  );
}

function HandleButton() {
  const setCount = useSetRecoilState(count);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
    </div>
  );
}

function Value() {
  const countValue = useRecoilValue(count);

  return <p>{countValue}</p>;
}

export default Parent;
