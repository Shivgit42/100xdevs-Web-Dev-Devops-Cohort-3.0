// import { useState } from "react";
import "./App.css";
// import { Button } from "./components/Button";
// import { Input } from "./components/Input";
// import { Hero } from "./components/Hero";
import { Otp } from "./components/Otp";

function App() {
  // const [birthYear, setBirthYear] = useState("");

  return (
    <div className="flex justify-center items-center bg-[#002a5a] h-screen">
      {/* <div className="flex flex-col items-center w-full max-w-[400px]"> */}
      {/* <Hero />
        <Input
          type="text"
          placeholder={"Your Birth Year"}
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
        />
        <Button disabled={birthYear.trim() === ""}>Continue</Button> */}
      <Otp />
      {/* </div> */}
    </div>
  );
}

export default App;
