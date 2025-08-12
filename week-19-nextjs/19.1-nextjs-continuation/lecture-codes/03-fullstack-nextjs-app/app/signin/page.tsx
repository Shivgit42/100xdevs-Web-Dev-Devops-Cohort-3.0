"use client";
import axios from "axios";

export default function SignIn() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h1 className="text-2xl text-gray-800 font-semibold text-center mb-4">
          Sign In
        </h1>

        {/* Form elements container having input boxes and button */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 text-black/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 text-black/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              axios.post("http://localhost:3000/api/v1/signin");
            }}
            className="w-full bg-blue-500 py-2 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
