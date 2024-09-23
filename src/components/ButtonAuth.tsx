"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  console.log({session,status});
  if (status === "loading") {
    return <p>Loading...</p>;
  }


  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => signOut()}
          className="bg-red-600 text-white p-3 mx-4 rounded-md"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => signIn()}
        className="bg-green-600 text-white p-3 mx-4 rounded-md"
      >
        Sign in
      </button>
    </>
  );
}
