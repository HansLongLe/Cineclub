import "./style.scss";

const TitleLogo = () => {
  return (
    <div className="title-logo">
      <img src={process.env.PUBLIC_URL + "/title1.png"} />
      <img src={process.env.PUBLIC_URL + "/title2.png"} className="title-logo__fire" />
    </div>
  );
};

export default TitleLogo;
