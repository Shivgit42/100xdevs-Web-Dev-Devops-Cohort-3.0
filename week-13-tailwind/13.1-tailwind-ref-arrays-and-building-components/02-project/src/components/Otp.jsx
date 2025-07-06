import { useRef } from "react";
import { useState } from "react";

export const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    //only allow digits
    if (!/^[0-9]?$/.test(value)) return;

    //other way to do check only digits
    // const value = e.target.value.replace(/[^0-9]/g, "")
    // if(value){
    //   const newOtp = [...otp];
    //   newOtp[index] = value;
    //   setOtp(newOtp);
    // }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //move to next input if value is not empty and not last box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  //other way to do it, easy approach
  // const handleKeyDown = (e, index) => {
  //   if (e.key === "Backspace") {
  //     e.preventDefault();
  //     const newOtp = [...otp];
  //     if (otp[index]) {
  //       newOtp[index] = "";
  //     } else if (index > 0) {
  //       inputRefs.current[index - 1]?.focus();
  //       newOtp[index - 1] = "";
  //     }
  //     setOtp(newOtp);
  //   }
  // };

  const isAllFilled = otp.every((digit) => digit !== "");

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Otp Inputs */}
      <div className="flex gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-12 bg-[#7f95ac] rounded-xl outline-none text-white text-center text-xl"
          />
        ))}
      </div>

      {/* Signup button */}
      <button
        disabled={!isAllFilled}
        className={`px-6 py-3 rounded-xl text-white text-lg font-semibold transition-all duration-300 ${
          isAllFilled
            ? "bg-green-500 hover:bg-green-600 cursor-pointer"
            : "bg-[#7f95ac] cursor-not-allowed"
        }`}
      >
        Sign up
      </button>
    </div>
  );
};

//? Creating a six input boxes
// export const Otp = () => {
//   return (
//     <div className="flex gap-2">
//       {Array.from({ length: 6 }).map((_, index) => (
//         <input
//           type="text"
//           key={index}
//           className="w-[40px] h-[50px] bg-[#7f95ac] rounded-xl outline-none text-white text-center"
//         />
//       ))}
//     </div>
//   );
// };
