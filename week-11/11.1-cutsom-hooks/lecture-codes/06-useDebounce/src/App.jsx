import { useState, useEffect } from "react";
import "./App.css";

import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [inputVal, setInputVal] = useState("");
  const debouncedValue = useDebounce(inputVal, 200);

  function change(e) {
    setInputVal(e.target.value);
  }

  useEffect(() => {
    //expensive operation
    console.log("expensive operation");
  }, [debouncedValue]);

  return (
    <div>
      <input type="text" onChange={change} />
    </div>
  );
}

export default App;
