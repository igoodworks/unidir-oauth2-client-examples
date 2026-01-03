# UnidirAngularClient

A professional Angular integration for the UniDir authentication platform, built on top of the `@unidir/unidir-spa-js` SDK. This client provides reactive authentication state management, secure route guarding, and automatic HTTP interception for Angular 17+ applications.

## Project Summary

`unidir-angular-client` simplifies the integration of UniDir's unidirectional authentication flow into Angular applications. It encapsulates complex OAuth2/OIDC logic—such as redirect handling, silent token refreshing, and persistent device identification—into a clean, injectable `AuthService`.

## Installation

To get started, install the core UniDir SPA SDK along with your Angular project dependencies:

```bash
npm install @unidir/unidir-spa-js
```

Ensure your project is running **Angular 17+** as this client utilizes standalone components and functional interceptors.

## How It Works

The client logic is centered around the `AuthService`, which manages the lifecycle of the authentication session:

1.  **Device Identification**: On startup, the service generates a unique `unidir_device_id` (UUID v4) and persists it in `localStorage` to ensure consistent session tracking across browser restarts.
2.  **Initialization**: The service initializes the `UniDirClient`. If it detects a `code` parameter in the URL (indicating a return from the login portal), it automatically exchanges the code for tokens and cleans the browser history.
3.  **Reactive State**: Using `BehaviorSubject`, the service exposes `isAuthenticated$` and `isInitialized$` observables, allowing components to react to login status changes in real-time.
4.  **Route Protection**: The `authGuard` prevents unauthorized access to protected routes by checking the authentication state and redirecting to the login portal if necessary.
5.  **Seamless Requests**: An `authInterceptor` automatically attaches the Access Token and the Device ID to every outgoing HTTP request.

## Implementation Guide

### 1. Configure the Provider

Add the necessary providers to your `app.config.ts`. This includes the router configuration and the HTTP client with the UniDir interceptor.

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    // ... your other providers
  ],
};
```

### 2. Protect Your Routes

Use the `authGuard` in your route definitions to secure specific views.

```typescript
// src/app/app.routes.ts
import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: "callback", component: CallbackComponent },
  { path: "login", component: LoginComponent },
];
```

### 3. Usage in Components

Inject the `AuthService` into your components to trigger authentication actions or display user data.

```typescript
// src/app/components/login/login.component.ts
import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  template: ` <button (click)="auth.login()">Sign in with UniDir</button> `,
})
export class LoginComponent {
  constructor(public auth: AuthService) {}
}
```

## API Reference

### `AuthService`

The primary service for managing authentication.

| Property / Method  | Type                  | Description                                                        |
| :----------------- | :-------------------- | :----------------------------------------------------------------- |
| `isAuthenticated$` | `Observable<boolean>` | Emits true if the user has a valid access token.                   |
| `isInitialized$`   | `Observable<boolean>` | Emits true once the SDK has finished checking the initial session. |
| `login()`          | `void`                | Redirects the user to the UniDir Login Portal.                     |
| `logout()`         | `void`                | Logs the user out and clears the local session.                    |
| `getAccessToken()` | `Promise<string>`     | Retrieves the current valid JWT access token.                      |
| `getIdToken()`     | `Promise<any>`        | Retrieves and decodes the ID token containing user profile data.   |

### `authGuard`

A functional guard that ensures a user is authenticated before accessing a route. If unauthenticated, it automatically triggers the `login()` flow.

### `authInterceptor`

A functional interceptor that clones outgoing `HttpRequest` objects to add:

- `Authorization: Bearer <token>`
- `x-device-id: <persistent-uuid>`

## License

MIT
