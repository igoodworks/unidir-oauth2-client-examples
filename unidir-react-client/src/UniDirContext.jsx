// src/UniDirContext.jsx
import React, { useEffect, useRef, useState } from "react";
import { UniDirClient } from "@unidir/unidir-spa-js";
import { UniDirContext } from "./context";

export const UniDirProvider = ({ children, config }) => {
  const [client] = useState(() => new UniDirClient(config));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const hasRun = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
      if (hasRun.current) return;
      try {
        const searchParams = new URLSearchParams(window.location.search);

        // 1. Check if we are returning from a login redirect
        if (searchParams.has("code")) {
          hasRun.current = true;
          await client.handleRedirectCallback();

          // 2. Clean the URL (remove ?code=...&state=...)
          // This prevents the code exchange from running again if the user refreshes
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }

        // 3. Check if we have a valid session
        const accessToken = await client.getAccessToken();
        //const tokens = await client.getTokens();
        // const refreshToken = await client.getRefreshToken();
        const idToken = await client.getIdToken();
        const expireAt = await client.getExpireAt();
        console.log("idToken", idToken, expireAt);
        if (accessToken) {
          setIsAuthenticated(true);
          // In a real app, you'd decode the ID Token or call a /userinfo endpoint
          setUser({ email: idToken.email, name: idToken.displayName });
        }
      } catch (err) {
        console.error("Authentication initialization failed:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [client]);

  const value = {
    user,
    isAuthenticated,
    loading,
    login: () => client.loginWithRedirect(),
    logout: () => client.logout(),
  };

  return (
    <UniDirContext.Provider value={value}>{children}</UniDirContext.Provider>
  );
};
