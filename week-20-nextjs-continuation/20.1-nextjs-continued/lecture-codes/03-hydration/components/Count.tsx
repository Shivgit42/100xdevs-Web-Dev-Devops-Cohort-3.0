"use client";

import { useEffect, useState } from "react";

export function Button() {
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  // const currentTime = Date.now();
  // solving hydration error when its get hydrated or after hydration using useEffect so the server and client match during the first render.

  useEffect(() => {
    setCurrentTime(Date.now());
  }, []);

  return (
    <div>
      {currentTime !== null ? currentTime : "Loading..."}
      <button
        onClick={() => {
          setCount((c) => c + 1);
          console.log("whats going on");
        }}
      >
        Click me {count}
      </button>
    </div>
  );
}
