import "./App.css";
import { useRecoilValue, RecoilRoot, useRecoilState } from "recoil";
import { notifications, totalNotificationSelector } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const [networkCount, setNetworkCount] = useRecoilState(notifications);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  return (
    <div>
      <button>Home</button>

      <button>
        My Network {networkCount.network >= 100 ? "99+" : networkCount.network}
      </button>
      <button>Jobs {networkCount.jobs} </button>
      <button>Messaging {networkCount.messaging} </button>
      <button>Notifications {networkCount.notifications} </button>

      <button>Me {totalNotificationCount} </button>
    </div>
  );
}

export default App;
