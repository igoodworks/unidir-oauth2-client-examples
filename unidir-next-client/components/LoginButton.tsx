"use client";
import { getDeviceId } from "@unidir/unidir-nextjs/client";
//import { getDeviceId } from "../../../unidir-nextjs/src/client";

export default function LoginButton() {
  const handleLogin = () => {
    const deviceId = getDeviceId();
    // Route to the new custom login page, passing the device_id
    window.location.href = `/login?device_id=${deviceId}`;
  };

  return (
    <button className="cursor-pointer" onClick={handleLogin}>
      Login
    </button>
  );
}
