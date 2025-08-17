"use client";

import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const myRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  return (
    <div className="w-screen h-screen bg-black/90 flex justify-center items-center">
      <div className="flex flex-col justify-center text-white  ">
        <TextInput
          inputRef={myRef}
          onChange={(e) => e.target.value}
          placeholder="Enter room code"
          classname="p-10 text-center text-md"
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
