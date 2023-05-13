import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/content/home";
import CreateAccount from "../components/content/createAccount";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "*",
        element: <Navigate replace to="/Home" />,
      },
    ],
  },
  {
    path: "/CreateAccount",
    element: <CreateAccount />,
  },
]);

export default router;
