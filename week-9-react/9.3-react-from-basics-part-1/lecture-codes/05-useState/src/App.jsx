import { useState } from "react";

function App() {
  return (
    <>
      <div style={{ backgroundColor: "#dfe6e9", height: "100vh" }}>
        <ToggleComponent />
        <ToggleComponent />
        <ToggleComponent />
        <NotificationsCount />
      </div>
    </>
  );
}

const ToggleComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle Message</button>
      {isVisible ? (
        <p>hi there</p>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
    </div>
  );
};

const NotificationsCount = () => {
  const [notificationCount, setNotificationsCount] = useState(0);

  return (
    <div>
      <button onClick={() => setNotificationsCount(notificationCount + 1)}>
        Increase count
      </button>
      {notificationCount}
    </div>
  );
};

export default App;
