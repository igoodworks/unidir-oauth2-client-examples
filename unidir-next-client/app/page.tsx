"use client";

import LoginButton from "@/components/LoginButton";
import { useUser } from "@unidir/unidir-nextjs/client";
//import { useUser } from "../../../unidir-nextjs/src/client";
import Link from "next/link";

export default function HomePage() {
  const { user, isLoading } = useUser();
  console.log("Library Export Check:", user);
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">UniDir Auth Demo</h1>

      {isLoading ? (
        <p className="mt-4">Checking session...</p>
      ) : user ? (
        <div className="mt-4">
          <p className="mb-4">Logged in as **{user.email}**</p>
          <Link
            href="/api/auth/logout"
            className="text-red-500 underline hover:text-red-700 transition-colors"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="mt-4">
          <p className="mb-4">You are not logged in.</p>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
