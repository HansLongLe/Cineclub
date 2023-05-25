import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/content/home";
import CreateAccount from "../components/content/createAccount";
import SpecificMovie from "../components/content/specificMovie";
import ListContent from "../components/content/listContent";
import { routePaths } from "../types/enums";
import BrowseLists from "../components/content/browseLists";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: routePaths.home,
        element: <Home />
      },
      {
        path: routePaths.specificMovie + ":movieId",
        element: <SpecificMovie />
      },
      {
        path: routePaths.myLists,
        element: <ListContent />
      },
      {
        path: routePaths.browseLists,
        element: <BrowseLists />
      },
      {
        path: "*",
        element: <Navigate replace to="/Home" />
      }
    ]
  },
  {
    path: routePaths.createAccount,
    element: <CreateAccount />
  }
]);

export default router;
