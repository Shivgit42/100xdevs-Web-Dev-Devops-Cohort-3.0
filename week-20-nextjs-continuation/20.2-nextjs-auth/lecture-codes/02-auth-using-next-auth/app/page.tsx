// "use client";

import { getServerSession } from "next-auth";

// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

// export default function Home() {
//   return (
//     <SessionProvider>
//       <RealHome />
//     </SessionProvider>
//   );
// }

// function RealHome() {
//   const session = useSession();

//   return (
//     <div>
//       {session.status === "authenticated" && (
//         <button onClick={() => signOut()}>Logout</button>
//       )}
//       {session.status === "unauthenticated" && (
//         <button onClick={() => signIn()}>Sign In</button>
//       )}
//     </div>
//   );
// }

export default async function Home() {
  const session = await getServerSession();

  return <div>{JSON.stringify(session)}</div>;
}
