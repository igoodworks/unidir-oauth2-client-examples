# unidir-react-client

`unidir-react-client` is a dedicated React wrapper for the **@unidir/unidir-spa-js** SDK. It provides a seamless way to integrate unidirectional authentication and state management into React single-page applications (SPAs). By leveraging React Context and Hooks, it simplifies session handling, token management, and secure login/logout flows.

## Features

- **React-Native Integration**: Uses React 18+ patterns for state management.
- **Automated Callback Handling**: Automatically processes OAuth2/OpenID Connect redirect codes.
- **Session Persistence**: Built-in support for device-based identification and token storage.
- **Hook-based API**: Simple access to authentication state and methods via `useUniDir`.
- **Lightweight & Fast**: Built on top of Vite for optimal development and production performance.

## Installation

You must install both the core SPA library and the React client wrapper:

```bash
npm install @unidir/unidir-spa-js unidir-react-client
```

## How It Works

The library functions as a stateful provider that wraps your application:

1.  **Initialization**: Upon mounting, the `UniDirProvider` instantiates a `UniDirClient`.
2.  **Callback Processing**: It checks the URL for a `code` parameter. If present, it executes the code exchange for tokens and cleans the browser history.
3.  **State Synchronization**: It verifies existing tokens (AccessToken, IdToken) to determine the user's authentication status.
4.  **Context Distribution**: It provides a global state (`user`, `isAuthenticated`, `loading`) and methods (`login`, `logout`) to any child component via the `useUniDir` hook.

## Quick Start

### 1. Configure and Provide

Wrap your root application (usually in `main.jsx`) with the `UniDirProvider`.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { UniDirProvider } from "unidir-react-client";
import App from "./App";

const unidirConfig = {
  domain: "your-domain.unidir.io",
  clientId: "your-client-id",
  redirectUri: window.location.origin,
  issuer: "[https://issuer.unidir.io](https://issuer.unidir.io)",
  jwksUrl:
    "[https://issuer.unidir.io/.well-known/jwks.json](https://issuer.unidir.io/.well-known/jwks.json)",
  deviceId: crypto.randomUUID(), // Or a persisted ID
  scope: "openid profile email",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UniDirProvider config={unidirConfig}>
      <App />
    </UniDirProvider>
  </React.StrictMode>
);
```

### 2. Consume via Hook

Use the `useUniDir` hook in any component to access authentication state.

```jsx
import { useUniDir } from "unidir-react-client";

function Dashboard() {
  const { user, isAuthenticated, loading, login, logout } = useUniDir();

  if (loading) return <div>Verifying Session...</div>;

  if (!isAuthenticated) {
    return <button onClick={login}>Sign In</button>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Reference

### `UniDirProvider`

The main context provider component.

| Prop       | Type        | Description                                                  |
| :--------- | :---------- | :----------------------------------------------------------- |
| `config`   | `Object`    | Configuration object for the `@unidir/unidir-spa-js` client. |
| `children` | `ReactNode` | The components that will have access to the auth context.    |

**Config Object Details:**

- `domain`: Your UniDir tenant domain.
- `clientId`: The public Client ID for your SPA.
- `redirectUri`: The URI where UniDir sends the user after authentication.
- `deviceId`: A unique string identifying the browser/device.

---

### `useUniDir()`

A custom hook to access the UniDir context.

**Returns:**

- `user`: `Object | null` - Contains user details (email, name) from the IdToken.
- `isAuthenticated`: `boolean` - True if a valid AccessToken exists.
- `loading`: `boolean` - True during the initial session check or redirect callback.
- `login`: `Function` - Triggers a redirect to the UniDir login page.
- `logout`: `Function` - Clears the session and logs the user out.

## License

MIT
