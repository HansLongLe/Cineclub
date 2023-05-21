import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Menu } from "@mui/material";
import LoginPopup from "../loginPopup";

const AuthenticationButtonGroup = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onSignUpClick = () => {
    navigate("/CreateAccount");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="authentication-button-group">
      <Button
        disableRipple
        className="authentication-button-group__login-button"
        onClick={handleClick}>
        LOGIN
      </Button>
      <div className="authentication-button-group-sign-up-container">
        <Button
          className="authentication-button-group-sign-up-container__button"
          onClick={onSignUpClick}
        />
        <p>SIGN UP</p>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          marginTop: "16px",
          "& .MuiPaper-root": {
            backgroundColor: "black",
            borderRadius: "30px",
          },
        }}>
        <LoginPopup />
      </Menu>
    </div>
  );
};

export default AuthenticationButtonGroup;
