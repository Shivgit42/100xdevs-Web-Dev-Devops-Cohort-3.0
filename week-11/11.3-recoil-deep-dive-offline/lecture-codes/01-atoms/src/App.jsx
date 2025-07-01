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

      <ButtonUpdater />
    </div>
  );
}

function ButtonUpdater() {
  const setMessagingAtomCount = useSetRecoilState(messsagingAtom);
  return (
    <button onClick={() => setMessagingAtomCount((c) => c + 1)}>Me</button>
  );
}

export default App;
