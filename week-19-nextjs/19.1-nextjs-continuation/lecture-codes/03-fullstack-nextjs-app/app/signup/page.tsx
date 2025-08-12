"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SignUp() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleSignUp = async () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    await axios
      .post("http://localhost:3000/api/v1/signup", {
        username,
        password,
      })
      .then(() => {
        router.push("/signin");
        if (usernameRef.current) usernameRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h1 className="text-2xl text-gray-800 font-semibold text-center mb-4">
          Sign Up
        </h1>

        {/* Form elements container having input boxes and button */}
        <div className="flex flex-col gap-4">
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            className="w-full p-3 text-black/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full p-3 text-black/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 py-2 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
