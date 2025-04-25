import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PendingRequestProvider } from "./Context/PendingRequestContext .jsx";

createRoot(document.getElementById("root")).render(
  <PendingRequestProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </PendingRequestProvider>
);
