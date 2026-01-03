import { unidir } from "./lib/unidir"; // The instance from initUniDir

export default unidir.withMiddlewareAuth();

// This is where the magic happens: protect the /admin folder
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
