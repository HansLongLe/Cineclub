import "./style.scss";

const AuthenticationButtonGroup = () => {
  return (
    <div className="authentication-button-group">
      <button className="authentication-button-group__login-button">Login</button>
      <div className="authentication-button-group-sign-up-container">
        <button className="authentication-button-group-sign-up-container__button" />
        <p>Sign up</p>
      </div>
    </div>
  );
};

export default AuthenticationButtonGroup;
