import { unidir } from "@/lib/unidir";
import { NextRequest } from "next/server";

export const GET = unidir.handleAuth();

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const userId = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const returnTo = formData.get("returnTo") as string;
  if (returnTo) {
    req.nextUrl.searchParams.set("returnTo", returnTo);
  }
  
  const deviceId = formData.get("device_id") as string;
  if (deviceId) {
    req.nextUrl.searchParams.set("device_id", deviceId);
  }

  const handler = unidir.handleAuth({ userId, password });
  return handler(req);
};
