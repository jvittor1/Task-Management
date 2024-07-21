import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TaskStateProvider } from "./contexts/TaskStateContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskStateProvider>
      <App />
    </TaskStateProvider>
  </React.StrictMode>,
);
