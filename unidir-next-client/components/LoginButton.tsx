"use client";
// /import { getDeviceId } from "@unidir/unidir-nextjs";
import { getDeviceId } from "../../../unidir-nextjs/src/client";

export default function LoginButton() {
  const handleLogin = () => {
    const deviceId = getDeviceId();
    // Pass the client-side ID to the login API
    window.location.href = `/api/auth/login?device_id=${deviceId}`;
  };

  return <button onClick={handleLogin}>Login</button>;
}
