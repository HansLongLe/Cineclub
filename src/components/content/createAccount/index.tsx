import "./style.scss";
import { Button, IconButton, Snackbar } from "@mui/material";
import TitleLogo from "../../titleLogo";
import { TiArrowLeftThick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import TextfieldGroup from "./textfieldGroup";
import { createAccount } from "../../../api";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>();
  const [firstName, setFirstName] = useState<string>("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState<string>();
  const [lastName, setLastName] = useState<string>("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>();
  const [username, setUsername] = useState<string>("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState<string>();

  const [successfullyCreated, setSuccessfullyCreated] = useState<boolean>(false);

  // At least one uppercase, one lowercase, one special character, one number and at least of length 12
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{12,}$/;
  // Is valid email
  /* eslint-disable */
  const isEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const goBack = () => {
    navigate("/Home");
  };

  const handleSignUp = async () => {
    if (validateInfo() && email && firstName && lastName && username && password) {
      const response = await createAccount(email, firstName, lastName, username, password);
      if (typeof response === "string" && response.includes("username")) {
        setUsernameErrorMessage("User with this username already exists");
      } else if (typeof response === "string" && response.includes("email")) {
        setEmailErrorMessage("User with this email already exists");
      } else {
        setSuccessfullyCreated(true);
      }
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessfullyCreated(false);
  };

  const validateInfo = (): boolean => {
    let correctInfo = true;
    if (!email) {
      correctInfo = false;
      setEmailErrorMessage("Email cannot be empty");
    }
    if (email && !isEmailRegex.test(email)) {
      correctInfo = false;
      setEmailErrorMessage("Email has not a valid format");
    }
    if (!firstName) {
      correctInfo = false;
      setFirstNameErrorMessage("First name cannot be empty");
    }
    if (!lastName) {
      correctInfo = false;
      setLastNameErrorMessage("Last name cannot be empty");
    }
    if (!username) {
      correctInfo = false;
      setUsernameErrorMessage("Username cannot be empty");
    }
    if (!password) {
      correctInfo = false;
      setPasswordErrorMessage("Password cannot be empty");
    }
    if (password && !strongPasswordRegex.test(password)) {
      correctInfo = false;
      setPasswordErrorMessage("Password is not a strong password");
    }
    if (!repeatPassword) {
      correctInfo = false;
      setRepeatPasswordErrorMessage("Repeated password cannot be empty");
    }
    if (repeatPassword && repeatPassword !== password) {
      correctInfo = false;
      setRepeatPasswordErrorMessage("Repeated password does not match previous password");
    }
    return correctInfo;
  };

  const SnackbarActions = (
    <Fragment>
      <IconButton
        onClick={handleClose}
        sx={{
          fontSize: "small",
          color: "#8685ef",
          "&:hover": {
            backgroundColor: "rgba(53, 52, 94, 0.5)",
          },
        }}>
        OK
      </IconButton>
    </Fragment>
  );

  return (
    <div className="create-account">
      <img src="./background.png" className="background" />
      <div className="sidebar">
        <IconButton
          onClick={goBack}
          sx={{
            position: "absolute",
            color: "#8685ef",
            top: "30%",
            left: "30%",
            transition: "transform 0.3s",
            "&:hover": {
              backgroundColor: "rgba(53, 52, 94, 0.5)",
              transform: "scale(1.1)",
            },
          }}>
          <TiArrowLeftThick fontSize="xx-large" />
        </IconButton>
        <div className="sidebar-content">
          <div className="sidebar-content__title">Create Account</div>
          <TextfieldGroup
            email={email}
            setEmail={setEmail}
            emailErrorMessage={emailErrorMessage}
            setEmailErrorMessage={setEmailErrorMessage}
            firstName={firstName}
            setFirstName={setFirstName}
            firstNameErrorMessage={firstNameErrorMessage}
            setFirstNameErrorMessage={setFirstNameErrorMessage}
            lastName={lastName}
            setLastName={setLastName}
            lastNameErrorMessage={lastNameErrorMessage}
            setLastNameErrorMessage={setLastNameErrorMessage}
            username={username}
            setUsername={setUsername}
            usernameErrorMessage={usernameErrorMessage}
            setUsernameErrorMessage={setUsernameErrorMessage}
            password={password}
            setPassword={setPassword}
            passwordErrorMessage={passwordErrorMessage}
            setPasswordErrorMessage={setPasswordErrorMessage}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            repeatPasswordErrorMessage={repeatPasswordErrorMessage}
            setRepeatPasswordErrorMessage={setRepeatPasswordErrorMessage}
          />
          <Button className="sign-up" disableRipple onClick={handleSignUp}>
            SIGN UP
          </Button>
          <TitleLogo />
        </div>
      </div>
      <Snackbar
        open={successfullyCreated}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Something went wrong"
        action={SnackbarActions}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
    </div>
  );
};

export default CreateAccount;
