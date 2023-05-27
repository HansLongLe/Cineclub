import "./style.scss";
import { FC, useState } from "react";
import { List } from "../../../types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteListApi } from "../../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../types/enums";

type Props = {
  list: List;
  listSuccessfullyDeleted: (listId: string) => void;
  hasDeleteButton?: boolean;
  canDeleteMovie?: boolean;
};

const ListItem: FC<Props> = (props) => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const [openedDialog, setOpenedDialog] = useState<boolean>(false);

  const deleteList = async () => {
    if (currentUser.userId && currentUser.token) {
      const response = await deleteListApi(props.list.id, currentUser.userId, currentUser.token);
      if (response.status === 200) {
        setOpenedDialog(false);
        props.listSuccessfullyDeleted(props.list.id);
      }
    }
  };

  return (
    <>
      <div className="list-item">
        {props.list.backdropPath ? (
          <img
            src={process.env.REACT_APP_IMG_URL + props.list.backdropPath}
            onClick={() =>
              navigate(
                props.canDeleteMovie
                  ? "/" + routePaths.specificList + props.list.id
                  : "/" + routePaths.publicSpecificList + props.list.id
              )
            }
          />
        ) : (
          <div
            className="clickable-div"
            onClick={() =>
              navigate(
                props.canDeleteMovie
                  ? "/" + routePaths.specificList + props.list.id
                  : "/" + routePaths.publicSpecificList + props.list.id
              )
            }
          />
        )}
        <div className="list-info">
          <div className="list-title">{props.list.name}</div>
          {props.list.movieName && <div className="movie-title">{props.list.movieName}</div>}
        </div>
        {props.hasDeleteButton && (
          <div className="delete-container">
            <IconButton
              title="Delete list"
              onClick={() => setOpenedDialog(true)}
              sx={{
                backgroundColor: "#141414",
                transition: "background-color 0.3s",
                "&:hover": { backgroundColor: "#2b2b2b" }
              }}>
              <RiDeleteBin6Line color="red" />
            </IconButton>
          </div>
        )}
      </div>
      <Dialog
        open={openedDialog}
        onClose={() => setOpenedDialog(false)}
        sx={{
          "& .MuiPaper-root": { backgroundColor: "black", borderRadius: "30px" },
          "& .MuiTypography-root": { color: "white", fontWeight: "bold" }
        }}>
        <DialogTitle
          sx={{
            textAlign: "center",
            margin: "16px 0"
          }}>
          Delete list
        </DialogTitle>
        <DialogContent
          sx={{ color: "white" }}>{`Do you want to delete "${props.list.name}" ?`}</DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="outlined"
            sx={{
              fontSize: "small",
              borderRadius: "20px",
              color: "white",
              maxHeight: "40px",
              height: "40px",
              maxWidth: "80px",
              width: "80px",
              borderWidth: "2px",
              borderColor: "#8685ef",
              transition: "border-color 0.3s",
              "&:hover": {
                borderWidth: "2px",
                borderColor: "#6665b5"
              }
            }}
            onClick={() => setOpenedDialog(false)}>
            No
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: "small",
              borderRadius: "20px",
              color: "white",
              maxHeight: "40px",
              height: "40px",
              maxWidth: "80px",
              width: "80px",
              backgroundColor: "#8685ef",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#6665b5"
              }
            }}
            onClick={deleteList}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListItem;
