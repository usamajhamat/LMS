import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { appStore } from "./app/store.js";
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
      <Toaster/>   
    </Provider>
  </StrictMode>
);
