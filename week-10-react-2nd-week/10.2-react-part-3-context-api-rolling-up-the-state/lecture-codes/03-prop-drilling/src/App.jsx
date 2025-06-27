import { useState } from "react";
import "./App.css";

//? Let's try to understand prop drilling and it's cons
//This is our main App component, if mutiple components are being rendered over here, any changes in props structure will lead to component's updateas well, and we have to manually apply or rewrite the changes where ever the props are being used, it will be very unreadable and headache
function App() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <div>
      <Light bulbOn={bulbOn} setBulbOn={setBulbOn} />
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
  return <div>{}</div>;
}

function LightSwitch() {
  return (
    <div>
      <button onClick={""}>Toggle the bulb</button>
    </div>
  );
}

export default App;

//Note
// the Light component does not need the props as it is not using it anywhere as element in the dom, then how can we pass the data from higher level component to lower-level component that is several layers deep in the components tree or how can we pass the props(bulbOn, setBulbOn) to LightBulb and LightSwitch. This is the problem with the prop drilling.

// There has to be intermediate components to pass the data from its parents to its lower level childrens, but it will make no sense if any middle component has props which is not being used or render in the dom element
