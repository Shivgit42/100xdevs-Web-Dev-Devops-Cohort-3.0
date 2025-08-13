"use client";

import axios from "axios";
import { useRef } from "react";

export default function Signin() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <h1>Sign in</h1>
      <br />
      <input ref={usernameRef} type="text" placeholder="username" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <button
        onClick={async () => {
          await axios
            .post("http://localhost:3000/api/signin", {
              username: usernameRef.current?.value,
              password: passwordRef.current?.value,
            })
            .then((response) => {
              localStorage.setItem("token", response.data.token);
            });
        }}
      >
        Sign in
      </button>
    </div>
  );
}
