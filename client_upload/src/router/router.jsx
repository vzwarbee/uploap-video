import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ListVideo } from "../screens/ListVideo";
import UploadVideo from "../screens/UploadVideo";
import LisDetailVideos from "../screens/LisDetailVideos";

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
      {
        path: "list-videos",
        element: <LisDetailVideos />,
      },
    ],
  },
]);
