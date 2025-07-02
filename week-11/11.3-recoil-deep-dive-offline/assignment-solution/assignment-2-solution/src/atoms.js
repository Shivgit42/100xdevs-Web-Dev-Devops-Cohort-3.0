import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: "todoAtomFamily",
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async () => {
      await new Promise((r) => setTimeout(r, 5000));
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?id=${id}`
        );
        return response.data[0];
      } catch (err) {
        throw new Error("Error while fetching todos" + err.message);
      }
    },
  }),
});
