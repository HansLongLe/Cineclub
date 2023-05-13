import "./style.scss";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

const navigationOptions = [{ text: "Home", logo: <BiHomeAlt2 /> }];
const userNavigationOptions = [
  { text: "Home", logo: <BiHomeAlt2 /> },
  { text: "My lists", logo: <AiOutlineHeart /> },
  { text: "Liked lists", logo: <AiOutlineLike /> },
];

const Navigation = () => {
  const navigate = useNavigate();
  const path = useParams();

  const handleOnClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="navigation-container">
      {navigationOptions.map((navigationItem, index) => {
        return (
          <div
            className={`navigation-container-navigation-item${
              path["*"] === navigationItem.text ? " --selected" : ""
            }`}
            key={index}
            onClick={() => handleOnClick(navigationItem.text)}>
            {path["*"] === navigationItem.text && <span />}
            {navigationItem.text}
            <div className="navigation-container-navigation-item__logo">{navigationItem.logo}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
