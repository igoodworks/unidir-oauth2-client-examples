"use client";

import { UserProvider } from "@unidir/unidir-nextjs/client";
//import { UserProvider } from "../../../unidir-nextjs/src/client";
import Link from "next/link"; // 1. Import the Link component
import "./globals.css";
import { config } from "@/lib/unidir";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen">
        <UserProvider config={config}>
          <nav className="p-4 bg-white shadow-sm flex gap-4">
            {/* 2. Replace <a> with <Link> */}
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard (Server)
            </Link>
            <Link href="/profile" className="hover:text-blue-600">
              Profile (Client)
            </Link>
          </nav>
          <main className="p-8">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
