import { selector } from "recoil";
import { counterAtom } from "../atoms/counter";

export const evenSelector = selector({
  key: "isEven",
  get: ({ get }) => {
    const currentCount = get(counterAtom);
    return currentCount % 2 === 0;
  },
});
