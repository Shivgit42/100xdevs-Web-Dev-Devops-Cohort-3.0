import "./App.css";
import { useIsOnline } from "./hooks/useIsOnline";

function App() {
  const isOnline = useIsOnline();

  return (
    <div>
      <h1>Network Status Checker</h1>
      <p style={{ fontSize: "24px", color: isOnline ? "green" : "red" }}>
        You are currently {isOnline ? "Online" : "Offline"}
      </p>
    </div>
  );
}

export default App;

//Usage
//! 🧪 How to Test It
//Run your app.

//In the browser:

//Open DevTools → Network tab.

//Find the "Online/Offline" toggle at the top(default "no throttling").

//Switch to Offline → You’ll see the text change to "Offline".

//Switch back to Online → It updates again.

//It also works if you actually disconnect your internet (like turn off Wi-Fi).
