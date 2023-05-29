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
  Switch,
  CircularProgress,
  Snackbar,
  Pagination
} from "@mui/material";
import { BsListNested, BsFillInfoCircleFill } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { textfieldSx } from "../createAccount/textfieldGroup";
import { FC, Fragment, useEffect, useState } from "react";
import { createListApi, fetchListApi } from "../../../api";
import { List } from "../../../types";
import ListItem from "./listItem";
import { useLocation, useNavigate } from "react-router-dom";
import { routePaths } from "../../../types/enums";

type Props = {
  title: string;
  apiPath: string;
  userId: string;
  token: string;
  useUserId?: boolean;
  hasCreateButton?: boolean;
  hasAddButton?: boolean;
  hasDeleteButton?: boolean;
  hasUnlikeButton?: boolean;
  hasPagination?: boolean;
  canDeleteMovie?: boolean;
};

const Lists: FC<Props> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openDialog, setToggleDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<List | List[]>();
  const [successfullyCreated, setSuccessfullyCreated] = useState<boolean>(false);
  const [successfullyDeleted, setSuccessfullyDeleted] = useState<boolean>(false);
  const [maxPage, setMaxPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getMyLists = async () => {
      const response = await fetchListApi(
        props.apiPath,
        props.userId,
        props.token,
        props.hasPagination ? currentPage : undefined,
        props.hasPagination ? 1 : undefined,
        props.hasPagination ? 10 : undefined
      );
      if (response && response.status === 200) {
        console.log(response);
        setCategoryList(response.data);
        if (response.data.totalPages !== undefined) {
          setMaxPage(response.data.totalPages);
          setCategoryList(response.data.result);
        }
      }
    };
    getMyLists();
    return () => {
      setCategoryList(undefined);
    };
  }, [location.pathname]);

  const createList = async () => {
    if (title.length === 0) {
      setTitleErrorMessage("Title of the list cannot be empty");
    }
    if (title.length !== 0) {
      const response = await createListApi(title, visible, props.userId, props.token);
      if (response.status === 200 && categoryList && Array.isArray(categoryList)) {
        const response = await fetchListApi(props.apiPath, props.userId, props.token);
        setToggleDialog(false);
        setSuccessfullyCreated(true);
        if (response.status === 200) {
          setCategoryList(response.data);
        }
      }
    }
  };

  const listSuccessfullyDeleted = (listId: string) => {
    if (Array.isArray(categoryList)) {
      setSuccessfullyDeleted(true);
      const newLists = categoryList.filter((list) => list.id !== listId);
      setCategoryList(newLists);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      createList();
    }
  };

  const SnackbarActions = (
    <Fragment>
      <IconButton
        onClick={() => setSuccessfullyDeleted(false)}
        sx={{
          fontSize: "small",
          color: "#8685ef",
          "&:hover": {
            backgroundColor: "rgba(53, 52, 94, 0.5)"
          }
        }}>
        OK
      </IconButton>
    </Fragment>
  );

  return (
    <>
      <div className="category">
        <div className="title">
          {props.hasCreateButton && (
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setToggleDialog(true)}
              title="Create list">
              <IoAddCircleOutline />
            </IconButton>
          )}
          {props.hasAddButton && (
            <IconButton
              sx={{ color: "white" }}
              onClick={() => navigate("/" + routePaths.browseLists)}
              title="Add list">
              <IoAddCircleOutline />
            </IconButton>
          )}
          <p>{props.title}</p>
          <BsListNested />
        </div>
        {categoryList ? (
          Array.isArray(categoryList) ? (
            <div className="lists">
              {categoryList.length !== 0 &&
                categoryList.map((list) => {
                  return (
                    <ListItem
                      key={list.id}
                      list={list}
                      listSuccessfullyDeleted={listSuccessfullyDeleted}
                      hasDeleteButton={props.hasDeleteButton}
                      canDeleteMovie={props.canDeleteMovie}
                      hasUnlikeButton={props.hasUnlikeButton}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="lists">
              <ListItem
                key={categoryList.id}
                list={categoryList}
                listSuccessfullyDeleted={listSuccessfullyDeleted}
                hasDeleteButton={props.hasDeleteButton}
                canDeleteMovie={props.canDeleteMovie}
                hasUnlikeButton={props.hasUnlikeButton}
              />
            </div>
          )
        ) : (
          <CircularProgress sx={{ color: "grey", float: "right" }} />
        )}
        {props.hasPagination && (
          <div className="pagination-container">
            <Pagination
              count={maxPage}
              page={currentPage}
              onChange={(_event, page) => setCurrentPage(page)}
              color="secondary"
              sx={{
                width: "800px",
                display: "flex",
                justifyContent: "center",
                marginTop: "48px",
                "& .MuiPaginationItem-root": {
                  color: "#fff",
                  "&.Mui-selected": {
                    backgroundColor: "#8685ef"
                  }
                }
              }}
            />
          </div>
        )}
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
            "& .MuiPaper-root": { backgroundColor: "black", borderRadius: "30px" },
            "& .MuiTypography-root": { color: "white", fontWeight: "bold" }
          }}>
          <DialogTitle sx={{ textAlign: "center" }}>Create List</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <TextField
              label="Introduce list title"
              fullWidth
              onKeyDown={(event) => handleKeyDown(event)}
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
      <Snackbar
        open={successfullyDeleted}
        autoHideDuration={5000}
        onClose={() => setSuccessfullyDeleted(false)}
        message="List successfully deleted"
        action={SnackbarActions}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
      <Snackbar
        open={successfullyCreated}
        autoHideDuration={5000}
        onClose={() => setSuccessfullyCreated(false)}
        message="List successfully created"
        action={SnackbarActions}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
    </>
  );
};

export default Lists;
