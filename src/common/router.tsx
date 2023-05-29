import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/content/home";
import CreateAccount from "../components/content/createAccount";
import SpecificMovie from "../components/content/specificMovie";
import ListContent from "../components/content/listContent";
import { routePaths } from "../types/enums";
import SpecificList from "../components/content/specificList";
import BrowseMovies from "../components/content/browseMovies";

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
        element: <ListContent />
      },
      {
        path: routePaths.specificList + ":listName/:listId",
        element: <SpecificList />
      },
      {
        path: routePaths.publicSpecificList + ":listName/:listId",
        element: <SpecificList />
      },
      {
        path: routePaths.browseMovies,
        element: <BrowseMovies />
      },
      {
        path: routePaths.browseMovies + "/:keyword",
        element: <BrowseMovies />
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
