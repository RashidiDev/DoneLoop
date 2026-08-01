import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TaskDBProvider } from "@/context/TaskDBContext";
import { registerSW } from "@/utils/swRegister";

registerSW();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskDBProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </TaskDBProvider>
  </StrictMode>,
);
