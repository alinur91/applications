import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ApplicationsProvider } from "./context/ApplicationsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ApplicationsProvider>
        <App />
      </ApplicationsProvider>
    </AuthProvider>
  </BrowserRouter>
);
