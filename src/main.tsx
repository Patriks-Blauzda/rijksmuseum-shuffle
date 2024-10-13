import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import PaintingDescription from "./routes/PaintingDescription.tsx";
import NotFound from "./routes/NotFound.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

// Handles redirects and error catching
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/painting/:id",
    element: <PaintingDescription />,
    errorElement: <ErrorBoundary />,
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
