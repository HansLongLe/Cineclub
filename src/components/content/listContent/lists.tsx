import "./style.scss";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Tooltip,
  Typography,
  DialogActions,
  Button,
  Switch
} from "@mui/material";
import { BsListNested, BsFillInfoCircleFill } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { textfieldSx } from "../createAccount/textfieldGroup";
import { FC, useState } from "react";
import { createListApi } from "../../../api";

type Props = {
  title: string;
  apiPath: string;
  userId: string;
  token: string;
  useUserId?: boolean;
  hasCreateButton?: boolean;
};

const Lists: FC<Props> = (props) => {
  const [openDialog, setToggleDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  // const [list, setList] = useState<object[]>([]);

  // useEffect(() => {
  //   const getMyLists = async () => {
  // const response = await fetchList(
  //   props.apiPath,
  //   props.useUserId ? props.userId : props.token,
  //   props.token
  // );
  // if (response.status === 200) {
  //   setList(response.data);
  // }
  //   };
  //   getMyLists();
  // }, []);

  const createList = async () => {
    if (title.length === 0) {
      setTitleErrorMessage("Title of the list cannot be empty");
    }
    if (title.length !== 0) {
      const response = await createListApi(title, visible, props.userId, props.token);
      console.log(response.status);
    }
  };
  return (
    <>
      <div className="category">
        <div className="title">
          {props.hasCreateButton && (
            <IconButton sx={{ color: "white" }} onClick={() => setToggleDialog(true)}>
              <IoAddCircleOutline />
            </IconButton>
          )}
          <p>{props.title}</p>
          <BsListNested />
        </div>
      </div>
      {props.hasCreateButton && (
        <Dialog
          open={openDialog}
          onClose={() => {
            setTitle("");
            setTitleErrorMessage(undefined);
            setToggleDialog(false);
          }}
          sx={{
            "& .MuiPaper-root": { backgroundColor: "rgba(0,0,0,0.5)" },
            "& .MuiTypography-root": { color: "white" }
          }}>
          <DialogTitle sx={{ textAlign: "center" }}>Create List</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <TextField
              label="Introduce list title"
              fullWidth
              onChange={(event) => {
                setTitle(event.target.value), setTitleErrorMessage(undefined);
              }}
              error={titleErrorMessage ? true : false}
              helperText={titleErrorMessage}
              sx={{ ...textfieldSx, margin: "16px 16px 0 16px" }}
            />
            <div className="visibility-container">
              {visible ? "Public" : "Private"}
              <Switch
                value={visible}
                onChange={(event) => setVisible(event.target.checked)}
                sx={{
                  "& .MuiSwitch-track": {
                    backgroundColor: "grey"
                  },
                  "& .Mui-checked": {
                    color: "#8685ef",
                    "&+.MuiSwitch-track": {
                      backgroundColor: "#6665b5"
                    }
                  }
                }}
              />
              <Tooltip
                title={
                  <Typography fontSize={12}>
                    Making the list Public means that the list will be publicly available to all
                    other users. Everyone can see the content of the list. This can be later
                    changed.
                  </Typography>
                }
                placement="right">
                <IconButton sx={{ color: "grey" }}>
                  <BsFillInfoCircleFill fontSize={12} />
                </IconButton>
              </Tooltip>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={createList}
              sx={{
                fontSize: "small",
                margin: "0 32px 16px 0",
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
              }}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Lists;
