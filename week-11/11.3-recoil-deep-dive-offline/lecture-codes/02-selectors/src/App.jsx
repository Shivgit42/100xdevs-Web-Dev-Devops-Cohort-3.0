import { useMemo } from "react";
import "./App.css";
import {
  jobsAtom,
  messsagingAtom,
  networkAtom,
  notificationAtom,
} from "./store/atoms/atoms";
import {
  useRecoilValue,
  RecoilRoot,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { totalNotificationSelector } from "./store/selectors/selectors";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const messagingAtomCount = useRecoilValue(messsagingAtom);
  const notificationAtomCount = useRecoilValue(notificationAtom);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);
  // const totalNotificationCount = useMemo(() => {
  //   return networkNotificationCount +
  //     jobsAtomCount +
  //     messagingAtomCount +
  //     notificationAtomCount;
  // }, [
  //   networkNotificationCount,
  //   jobsAtomCount,
  //   messagingAtomCount,
  //   notificationAtomCount,
  // ]);

  return (
    <div>
      <button>Home</button>

      <button>
        My Network{" "}
        {networkNotificationCount >= 100 ? "99+" : networkNotificationCount}
      </button>
      <button>Jobs {jobsAtomCount} </button>
      <button>Messaging {messagingAtomCount} </button>
      <button>Notifications {notificationAtomCount} </button>
      <button>Me {totalNotificationCount} </button>
    </div>
  );
}

export default App;
