import { routePaths } from "../../types/enums";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const TitleLogo = () => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(routePaths.home);
  };

  return (
    <div className="title-logo" onClick={navigateTo}>
      <img src={process.env.PUBLIC_URL + "/images/title1.png"} />
      <img src={process.env.PUBLIC_URL + "/images/title2.png"} className="title-logo__fire" />
    </div>
  );
};

export default TitleLogo;
