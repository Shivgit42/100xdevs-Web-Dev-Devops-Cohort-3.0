import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: selectorFamily({
    key: "todoSelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?id=${id}`
        );
        return response.data[0];
      },
  }),
});
