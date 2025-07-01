import axios from "axios";
import { atom, selector } from "recoil";

export const notifications = atom({
  key: "networkAtom",
  default: selector({
    key: "networkSelector",
    get: async () => {
      await new Promise((r) => setTimeout(r, 5000));
      const response = await axios.get(
        "https://mocki.io/v1/c81143ec-5879-47b7-b081-a82271a43199"
      );
      return response.data;
    },
  }),
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const allNotifications = get(notifications);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.messaging +
      allNotifications.notifications
    );
  },
});
