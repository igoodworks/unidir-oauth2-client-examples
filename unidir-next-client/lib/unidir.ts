//import { initUniDir } from "@unidir/unidir-nextjs";
import { initUniDir } from "../../../unidir-nextjs/src/index";

export const config = {
  domain: process.env.UNIDIR_DOMAIN!,
  clientId: process.env.UNIDIR_CLIENT_ID!,
  clientSecret: process.env.UNIDIR_CLIENT_SECRET!,
  secret: process.env.UNIDIR_SECRET!,
  redirectUri: process.env.UNIDIR_REDIRECT_URI!,
};

export const unidir = initUniDir(config);
