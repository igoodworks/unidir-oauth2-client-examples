// types/auth.ts
export interface UniDirUser {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
  email_verified?: boolean;
  // Add custom claims if you configured them in UniDir
  role?: string;
  jkt?: string; // DPoP Thumbprint
}
