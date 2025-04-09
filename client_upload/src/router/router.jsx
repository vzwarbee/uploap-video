import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ListVideo } from "../screens/ListVideo";
import UploadVideo from "../screens/UploadVideo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ListVideo />,
      },
      {
        path: "upload-video",
        element: <UploadVideo />,
      },
    ],
  },
]);
