import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./global.css";

// Suppress React Router future flag warning in dev console
if (import.meta.env.DEV) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("React Router Future Flag Warning")
    ) {
      // Ignore this specific warning
      return;
    }
    originalWarn(...args);
  };
}

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true, // New behavior enabled
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // You can wrap in StrictMode if you want, but warning may repeat during dev
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
