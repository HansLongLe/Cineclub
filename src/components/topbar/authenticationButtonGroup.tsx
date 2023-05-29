import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, Menu, Snackbar } from "@mui/material";
import LoginPopup from "../loginPopup";
import { routePaths } from "../../types/enums";

type Props = {
  snackbarOpen: boolean;
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
};

const AuthenticationButtonGroup: FC<Props> = (props) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onSignUpClick = () => {
    navigate(routePaths.createAccount);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    props.setSnackbarOpen(false);
  };

  return (
    <div className="authentication-button-group" data-testid="authentication-button-group">
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
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        sx={{
          marginTop: "16px",
          "& .MuiPaper-root": {
            backgroundColor: "black",
            borderRadius: "30px"
          }
        }}>
        <LoginPopup />
      </Menu>
      <Snackbar
        open={props.snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Successfuly logged out"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
    </div>
  );
};

export default AuthenticationButtonGroup;
