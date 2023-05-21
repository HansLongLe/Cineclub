import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../api";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

const UserButton = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.currentUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (currentUser.token) {
      const response = await logout(currentUser.token);
      if (response.status === 200) {
        dispatch(setCurrentUser({ token: undefined, username: undefined }));
      }
    }
  };

  return (
    <div className="user-button">
      <div className="user-button-container">
        <img className="user-button-container__img" src="./avatarIcon.png" />
        <Button disableRipple className="user-button-container__button" onClick={handleClick} />
        <p>{currentUser.username}</p>
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
            width: "10.5%",
          },
          "& .MuiList-root": { display: "flex", justifyContent: "center" },
          "& .MuiMenuItem-root": {
            width: "90%",
            color: "white",
            display: "flex",
            justifyContent: "center",
            borderRadius: "30px",
          },
          "& svg": {
            marginLeft: "16px",
          },
        }}>
        <MenuItem onClick={handleLogout}>
          Logout <FiLogOut />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserButton;
