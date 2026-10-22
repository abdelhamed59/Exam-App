import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { routes } from "./routes";
import App from "./app";
import { Toaster } from "./components/ui/toast";

const router = createBrowserRouter(routes, {
  basename: "/Exam-App",
});
const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <App>
      <Toaster>
      <RouterProvider router={router} />
      </Toaster>
    </App>
  </StrictMode>,
);
