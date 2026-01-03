import { unidir } from "@/lib/unidir";
import { UniDirUser } from "@/types/auth";

// Define props to include the user object correctly
interface DashboardProps {
  user: UniDirUser;
}

async function DashboardPage({ user }: DashboardProps) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Secure Server Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Your ID is: {user.sub}</p>
    </div>
  );
}

export default unidir.withPageAuthRequired(DashboardPage);
