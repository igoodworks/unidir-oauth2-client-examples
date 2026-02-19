import { initUniDir } from "@unidir/unidir-nextjs/server";

interface UniDirTokenSet {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

export const config = {
  domain: process.env.UNIDIR_DOMAIN!,
  clientId: process.env.UNIDIR_CLIENT_ID!,
  clientSecret: process.env.UNIDIR_CLIENT_SECRET!,
  secret: process.env.UNIDIR_SECRET!,
  redirectUri: process.env.UNIDIR_REDIRECT_URI!,
  useDPoP: true,
  /*
  ////////////////////////////////////////////
  default: save session information in cookie.
  if you want to save session in db and sessionId. Please use following store property.
  ////////////////////////////////////////////
  session: {
    store: {
      get: async (id: string) => {
        const s = await prisma.session.findUnique({ where: { id } });
        return s ? JSON.parse(s.data) : null;
      },
      set: async (id: string, data: UniDirTokenSet, maxAge: number) => {
        console.log("data", data);
        await prisma.session.create({
          data: { id, data: JSON.stringify(data) }
        });
      },
      delete: async (id: string) => {
        await prisma.session.delete({ where: { id } });
      },
    },
  },
  */
};

export const unidir = initUniDir(config);
