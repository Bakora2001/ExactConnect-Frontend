import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "../src/context/DarkModeContext.jsx";
import ErrorPage from "./components/pages/ErrorPage";
import ErrorBoundary from "./components/pages/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => (location.href = "/")}
    >
      <DarkModeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#4a3da0",
              },
            },
          }}
        />
        <RouterProvider router={router} />
      </DarkModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
