import { selector } from "recoil";
import {
  jobsAtom,
  messsagingAtom,
  networkAtom,
  notificationAtom,
} from "../atoms/atoms";

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const networkAtomCount = get(networkAtom);
    const jobsAtomCount = get(jobsAtom);
    const messagingAtomCount = get(messsagingAtom);
    const notificationAtomCount = get(notificationAtom);
    return (
      networkAtomCount +
      jobsAtomCount +
      messagingAtomCount +
      notificationAtomCount
    );
  },
});
