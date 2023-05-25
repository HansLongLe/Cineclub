import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import "./style.scss";
import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { login } from "../../api";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

const textfieldSx = {
  width: "300px",
  margin: "16px 0 16px 0",
  input: {
    backgroundColor: "rgba(227, 227, 227, 0.2)",
    borderRadius: "20px",
    color: "white"
  },
  "& .MuiInputLabel-root": {
    color: "#adadad"
  },
  "& .MuiInputLabel-shrink": {
    top: "-8px"
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#8685ef"
  },
  "& input:focus": {
    border: "1px solid #8685ef",
    borderRadius: "20px"
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none"
  }
};

const LoginPopup = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (username.length === 0) {
      setUsernameErrorMessage("Username cannot be empty");
    }
    if (password.length === 0) {
      setPasswordErrorMessage("Password cannot be empty");
    }
    if (username.length !== 0 && password.length !== 0) {
      const loginResponse = await login(username, password);
      if (typeof loginResponse === "string" && loginResponse.includes("Username")) {
        setUsernameErrorMessage("User with this username does not exist");
      } else if (typeof loginResponse === "string" && loginResponse.includes("Password")) {
        setPasswordErrorMessage("Password is incorrect");
      } else if (loginResponse.status === 200) {
        dispatch(
          setCurrentUser({
            token: loginResponse.data.token,
            username: username,
            userId: loginResponse.data.userId
          })
        );
      }
    }
  };

  return (
    <div className="login-popup">
      <TextField
        label="Username"
        sx={textfieldSx}
        onKeyDown={(event) => {
          handleKeyDown(event);
        }}
        onChange={(event) => {
          setUsernameErrorMessage("");
          setUsername(event.target.value);
        }}
        value={username}
        error={usernameErrorMessage.length !== 0}
        helperText={usernameErrorMessage}
      />
      <div className="textfield-container">
        <TextField
          label="Password"
          type={`${visiblePassword ? "text" : "password"}`}
          sx={textfieldSx}
          onKeyDown={(event) => {
            handleKeyDown(event);
          }}
          onChange={(event) => {
            setPasswordErrorMessage("");
            setPassword(event.target.value);
          }}
          error={passwordErrorMessage.length !== 0}
          helperText={passwordErrorMessage}
        />
        <div className="icon">
          <Tooltip title={`${visiblePassword ? "Hide password" : "Show password"}`}>
            <IconButton
              sx={{ color: "rgba(227, 227, 227, 0.5)" }}
              onClick={togglePasswordVisibility}>
              {visiblePassword ? <HiEye fontSize="medium" /> : <HiEyeSlash fontSize="medium" />}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Button className="login-button" disableRipple onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default LoginPopup;
