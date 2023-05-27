import "./style.scss";
import { BiHomeAlt2 } from "react-icons/bi";
import { MdOutlineMovie } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { TbListSearch } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { routePaths } from "../../types/enums";

const navigationOptions = [
  { text: "Home", logo: <BiHomeAlt2 />, path: routePaths.home },
  { text: "Browse Movies", logo: <MdOutlineMovie />, path: routePaths.browseMovies }
];

const userNavigationOptions = [
  ...navigationOptions,
  { text: "Browse lists", logo: <TbListSearch />, path: routePaths.browseLists },
  { text: "My lists", logo: <BsList />, path: routePaths.myLists }
];

const Navigation = () => {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const navigate = useNavigate();
  const path = useParams();

  const handleOnClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="navigation-container">
      {(currentUser.token ? userNavigationOptions : navigationOptions).map(
        (navigationItem, index) => {
          return (
            <div
              className={`navigation-container-navigation-item${
                path["*"] === navigationItem.path ? " --selected" : ""
              }`}
              key={index}
              onClick={() => handleOnClick(navigationItem.path)}>
              {path["*"] === navigationItem.path && <span />}
              {navigationItem.text}
              <div className="navigation-container-navigation-item__logo">
                {navigationItem.logo}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Navigation;
