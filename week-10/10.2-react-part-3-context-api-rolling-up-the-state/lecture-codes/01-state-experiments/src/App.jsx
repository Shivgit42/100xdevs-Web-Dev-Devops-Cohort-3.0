import { useState } from "react";

function App() {
  return (
    <div>
      <LightBulb />
    </div>
  );
}

function LightBulb() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <div>
      <BulbState bulbOn={bulbOn} />
      <ToggleBulbState setBulbOn={setBulbOn} />
    </div>
  );
}

function BulbState({ bulbOn }) {
  return <div>{bulbOn ? "Bulb on" : "Bulb off"}</div>;
}

function ToggleBulbState({ setBulbOn }) {
  return (
    <div>
      <button onClick={() => setBulbOn((b) => !b)}>Toggle the bulb</button>
    </div>
  );
}

export default App;
