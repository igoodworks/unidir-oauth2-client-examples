"use client";

import Link from "next/link";
import LoginButton from "./LoginButton";
import { useUser } from "@unidir/unidir-nextjs/client";
//import { useUser } from "../../../unidir-nextjs/src/client";

export default function Navbar() {
  const { user, isLoading } = useUser();

  if (isLoading) return <nav className="p-4">Loading...</nav>;
  console.log("user", user);
  return (
    <nav className="p-4 bg-white shadow-sm flex gap-4">
      <Link href="/" className="hover:text-blue-600">
        Home
      </Link>

      {user ? (
        <>
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/api/auth/logout" className="text-red-500 font-medium">
            Logout
          </Link>
        </>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
