import { useContext } from "react";
import { BulBProvider, BulbContext } from "./Context";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BulBProvider>
        <Light />
      </BulBProvider>
    </div>
  );
}

function Light() {
  return (
    <div>
      <LightBulb />
      <LightSwitch />
    </div>
  );
}

function LightBulb() {
  const { bulbOn } = useContext(BulbContext);

  return (
    <div>
      {bulbOn ? (
        <img src="https://www.w3schools.com/js/pic_bulbon.gif" />
      ) : (
        <img src="https://www.w3schools.com/js/pic_bulboff.gif" />
      )}
    </div>
  );
}

function LightSwitch() {
  const { setBulbOn } = useContext(BulbContext);

  return (
    <div>
      <button onClick={() => setBulbOn((b) => !b)}>Toggle the bulb</button>
    </div>
  );
}

export default App;
