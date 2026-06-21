"use client";

import { useUser } from "@unidir/unidir-nextjs/client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const [error, setError] = useState<string | null>(null);

  // Example showing how you might fetch an API route from the client using the cookie
  useEffect(() => {
    if (user) {
      // Just a placeholder to show valid client-side rendering
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <p className="text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-red-50 p-6 rounded shadow border border-red-200">
        <h1 className="text-2xl font-bold mb-4 text-red-800">Please Log In</h1>
        <p className="text-red-700">
          You must be logged in to view your profile.
        </p>
        <a href="/login" className="mt-4 inline-block text-red-600 underline">
          Go to login
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
        Client-Side Profile
      </h1>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Email
          </h2>
          <p className="text-lg text-gray-900">{user.email}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Subject ID
          </h2>
          <p className="text-gray-700 font-mono text-sm">{user.sub}</p>
        </div>

        {user.name && (
          <div className="bg-gray-50 p-4 rounded border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Name
            </h2>
            <p className="text-gray-900">{user.name.formatted}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded border border-blue-100 mt-6">
          <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-2">
            Raw User Object
          </h2>
          <pre className="bg-white p-3 rounded text-xs overflow-auto text-gray-800 shadow-inner">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
