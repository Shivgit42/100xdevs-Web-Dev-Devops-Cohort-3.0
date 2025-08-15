"use client";

import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const myRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <TextInput
          inputRef={myRef}
          onChange={(e) => e.target.value}
          placeholder="Enter room code"
        />
        <button
          onClick={() => {
            router.push(`/chat/${myRef.current?.value}`);
          }}
          className="p-5 cursor-pointer"
        >
          Join room
        </button>
      </div>
    </div>
  );
}
