import "./style.scss";
import { TextField, Tooltip, IconButton } from "@mui/material";
import { Dispatch, FC, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { BsFillInfoCircleFill } from "react-icons/bs";

type Props = {
  email: string;
  setEmail: Dispatch<React.SetStateAction<string>>;
  emailErrorMessage: string | undefined;
  setEmailErrorMessage: Dispatch<React.SetStateAction<string | undefined>>;
  firstName: string;
  setFirstName: Dispatch<React.SetStateAction<string>>;
  firstNameErrorMessage: string | undefined;
  setFirstNameErrorMessage: Dispatch<React.SetStateAction<string | undefined>>;
  lastName: string;
  setLastName: Dispatch<React.SetStateAction<string>>;
  lastNameErrorMessage: string | undefined;
  setLastNameErrorMessage: Dispatch<React.SetStateAction<string | undefined>>;
  username: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
  usernameErrorMessage: string | undefined;
  setUsernameErrorMessage: Dispatch<React.SetStateAction<string | undefined>>;
  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
  passwordErrorMessage: string | undefined;
  setPasswordErrorMessage: Dispatch<React.SetStateAction<string | undefined>>;
  repeatPassword: string;
  setRepeatPassword: Dispatch<React.SetStateAction<string>>;
  repeatPasswordErrorMessage: string | undefined;
  setRepeatPasswordErrorMessage: Dispatch<React.SetStateAction<string | undefined>>;
};

export const textfieldSx = {
  width: "300px",
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

const TextfieldGroup: FC<Props> = (props) => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <div className="sidebar-content-textfield-group">
      <div className="sidebar-content-textfield-group-left">
        <div className="textfield-container">
          <TextField
            label="Email *"
            type="email"
            value={props.email}
            onChange={(event) => {
              props.setEmailErrorMessage(undefined);
              props.setEmail(event.target.value);
            }}
            error={props.emailErrorMessage ? true : false}
            helperText={props.emailErrorMessage}
            sx={textfieldSx}
          />
        </div>
        <div className="textfield-container">
          <TextField
            label="First name *"
            value={props.firstName}
            onChange={(event) => {
              props.setFirstNameErrorMessage(undefined);
              props.setFirstName(event.target.value);
            }}
            error={props.firstNameErrorMessage ? true : false}
            helperText={props.firstNameErrorMessage}
            sx={textfieldSx}
          />
        </div>
        <div className="textfield-container">
          <TextField
            label="Last name *"
            value={props.lastName}
            onChange={(event) => {
              props.setLastNameErrorMessage(undefined);
              props.setLastName(event.target.value);
            }}
            error={props.lastNameErrorMessage ? true : false}
            helperText={props.lastNameErrorMessage}
            sx={textfieldSx}
          />
        </div>
      </div>
      <div className="sidebar-content-textfield-group-right">
        <div className="textfield-container">
          <TextField
            label="Username *"
            value={props.username}
            onChange={(event) => {
              props.setUsernameErrorMessage(undefined);
              props.setUsername(event.target.value);
            }}
            error={props.usernameErrorMessage ? true : false}
            helperText={props.usernameErrorMessage}
            sx={textfieldSx}
          />
        </div>
        <div className="textfield-container">
          <TextField
            label="Password *"
            value={props.password}
            onChange={(event) => {
              props.setPasswordErrorMessage(undefined);
              props.setPassword(event.target.value);
            }}
            type={`${visiblePassword ? undefined : "password"}`}
            error={props.passwordErrorMessage ? true : false}
            helperText={props.passwordErrorMessage}
            sx={textfieldSx}
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
          <div className="icon2">
            <Tooltip
              title="Strong password is a password which contains at least
               one uppercase, one lowercase, one special character (!@#$&*), one number and is at least of length 12"
              placement="right">
              <IconButton sx={{ color: "rgba(227, 227, 227, 0.5)", cursor: "help" }}>
                <BsFillInfoCircleFill fontSize="medium" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="textfield-container">
          <TextField
            label="Repeat password *"
            value={props.repeatPassword}
            onChange={(event) => {
              props.setRepeatPasswordErrorMessage(undefined);
              props.setRepeatPassword(event.target.value);
            }}
            type={`${visiblePassword ? undefined : "password"}`}
            error={props.repeatPasswordErrorMessage ? true : false}
            helperText={props.repeatPasswordErrorMessage}
            sx={textfieldSx}
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
      </div>
    </div>
  );
};

export default TextfieldGroup;
