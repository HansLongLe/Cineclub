import "./style.scss";
import { useNavigate } from "react-router-dom";

const TitleLogo = () => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate("/Home");
  };

  return (
    <div className="title-logo" onClick={navigateTo}>
      <img src={process.env.PUBLIC_URL + "/title1.png"} />
      <img src={process.env.PUBLIC_URL + "/title2.png"} className="title-logo__fire" />
    </div>
  );
};

export default TitleLogo;
