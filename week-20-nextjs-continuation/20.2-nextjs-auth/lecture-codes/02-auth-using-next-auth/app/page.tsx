"use client";

import { SessionProvider, useSession } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <RealHome />
    </SessionProvider>
  );
}

function RealHome() {
  const session = useSession();

  return <div>{session.status === "authenticated" ? "Logout" : "Sign in"}</div>;
}
