# unidir-next-client

A professional Next.js 15+ integration for the UniDir authentication platform. This client library leverages Next.js App Router features, including Middleware, Server Components, and API Routes, to provide a seamless and secure unidirectional authentication experience.

## Project Summary

`unidir-next-client` is an implementation of the UniDir SDK tailored specifically for the Next.js ecosystem. It provides a robust architecture for handling user sessions across both server-side and client-side environments. By using this client, developers can protect routes via Middleware, fetch authenticated user data in Server Components, and utilize React Hooks for client-side state management.

## Installation

Install the required dependencies in your Next.js project:

```bash
npm install @unidir/unidir-nextjs cookie jose
```

_Note: During development, this client is configured to transpile the `@unidir/unidir-nextjs` package to support local symlinked development._

## How It Works

The integration is built on three core pillars:

1.  **Server-Side SDK (`initUniDir`)**: Configures the connection to the UniDir domain. It provides handlers for API routes and helper functions like `withPageAuthRequired` to secure Server Components.
2.  **Edge Middleware**: The `withMiddlewareAuth` wrapper intercepts incoming requests to protected routes (e.g., `/dashboard`, `/admin`). It validates the session before the request even reaches your application logic.
3.  **Client-Side Context (`UserProvider`)**: Wraps the application layout to provide global access to the `user` object and `isLoading` state via the `useUser` hook. It also manages a persistent `device_id` stored in the browser's `localStorage` to identify the hardware initiating the login.

## Setup & Usage

### 1. Initialize UniDir

Create a library file to export your configured instance.

```typescript
// lib/unidir.ts
import { initUniDir } from "@unidir/unidir-nextjs";

export const config = {
  domain: process.env.UNIDIR_DOMAIN!,
  clientId: process.env.UNIDIR_CLIENT_ID!,
  clientSecret: process.env.UNIDIR_CLIENT_SECRET!,
  secret: process.env.UNIDIR_SECRET!, // Cookie encryption secret
  redirectUri: process.env.UNIDIR_REDIRECT_URI!,
};

export const unidir = initUniDir(config);
```

### 2. Configure Auth Routes

Create a dynamic API route to handle login, logout, and callback logic.

```typescript
// app/api/auth/[unidir]/route.ts
import { unidir } from "@/lib/unidir";

export const GET = unidir.handleAuth();
```

### 3. Global Provider Setup

Wrap your root layout with the `UserProvider`.

```tsx
// app/layout.tsx
import { UserProvider } from "@unidir/unidir-nextjs/client";
import { config } from "@/lib/unidir";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <UserProvider config={config}>{children}</UserProvider>
      </body>
    </html>
  );
}
```

### 4. Protecting Routes (Middleware)

Use the middleware to protect entire folder structures.

```typescript
// middleware.ts
import { unidir } from "./lib/unidir";

export default unidir.withMiddlewareAuth();

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

## API Reference

### Server Utilities (`unidir`)

| Method                       | Description                                                                 |
| :--------------------------- | :-------------------------------------------------------------------------- |
| `handleAuth()`               | Returns GET handlers for `/api/auth/login`, `/callback`, and `/logout`.     |
| `withPageAuthRequired(Page)` | An HOC for Server Components that redirects unauthenticated users to login. |
| `withMiddlewareAuth()`       | Edge-compatible middleware for route protection and session validation.     |

### Client Utilities

| Hook / Function | Description                                                                            |
| :-------------- | :------------------------------------------------------------------------------------- |
| `useUser()`     | Returns `{ user, error, isLoading }`. Access user profile data like `email` and `sub`. |
| `getDeviceId()` | Retrieves or generates a unique UUID v4 stored in `localStorage`.                      |

### User Object Structure (`UniDirUser`)

```typescript
interface UniDirUser {
  sub: string; // Unique User ID
  email?: string; // User Email
  name?: string; // Full Name
  picture?: string; // Profile Image URL
  email_verified?: boolean;
}
```

## Environment Variables Required

```env
UNIDIR_DOMAIN=your-tenant.unidir.io
UNIDIR_CLIENT_ID=your-client-id
UNIDIR_CLIENT_SECRET=your-client-secret
UNIDIR_SECRET=a-long-random-string-for-cookie-encryption
UNIDIR_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

## License

MIT © UniDir Team
