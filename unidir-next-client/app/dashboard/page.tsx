import { unidir } from "@/lib/unidir";
import { UniDirUser } from "@/types/auth";

// Define props to include the user object correctly
interface DashboardProps {
  user: UniDirUser;
}
async function DashboardPage({ user }: DashboardProps) {
  console.log("user ===>", user);
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Secure Server Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <p>Your ID is: {user.sub}</p>
      {user.jkt ? (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="font-semibold text-green-700">✓ DPoP Bound</p>
          <p className="text-xs text-green-600 break-all">JKT: {user.jkt}</p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="font-semibold text-yellow-700">
            ⚠ Bearer Token (No DPoP)
          </p>
        </div>
      )}
    </div>
  );
}

export default unidir.withPageAuthRequired(DashboardPage);
