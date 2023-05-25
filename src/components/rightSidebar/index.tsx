import TitleLogo from "../titleLogo";
import Navigation from "./navigation";
import "./style.scss";

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      <div className="right-sidebar-title-container">
        <TitleLogo />
      </div>
      <div className="right-sidebar-navigation-menu">
        <Navigation />
      </div>
      <div className="right-sidebar-footer">
        <img src="/images/TMDB logo.png" />
      </div>
    </div>
  );
};

export default RightSidebar;
