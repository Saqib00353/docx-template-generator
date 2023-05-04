import { createBrowserRouter } from "react-router-dom";
import Upload from "./pages/Upload";
import CMISample from "./pages/CMISample";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Upload />,
  },
  {
    path: "/cmi-sample",
    element: <CMISample />,
  },
]);
