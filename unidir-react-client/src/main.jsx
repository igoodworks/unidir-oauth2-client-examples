// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client"; // <--- Must be /client
import App from "./App.jsx";
import { UniDirProvider } from "./UniDirContext";
import "./index.css";

const getDeviceId = () => {
  let id = localStorage.getItem("unidir_device_id");
  if (!id) {
    id = crypto.randomUUID(); // Generate a new one if it doesn't exist
    localStorage.setItem("unidir_device_id", id);
  }
  return id;
};

// Configuration for your SDK
const unidirConfig = {
  domain: import.meta.env.VITE_UNIDIR_DOMAIN,
  clientId: import.meta.env.VITE_UNIDIR_CLIENT_ID,
  redirectUri: import.meta.env.VITE_UNIDIR_REDIRECT_URI,
  issuer: import.meta.env.VITE_UNIDIR_ISSUER,
  jwksUrl: import.meta.env.VITE_UNIDIR_JWKS,
  deviceId: getDeviceId(),
  scope: import.meta.env.VITE_UNIDIR_SCOPE,
  useDPoP: true,
};

// Modern React 18 rendering pattern
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UniDirProvider config={unidirConfig}>
      <div className="container">
        <App />
      </div>
    </UniDirProvider>
  </React.StrictMode>,
);
