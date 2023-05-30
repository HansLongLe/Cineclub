import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  IconButton,
  Switch,
  Tooltip,
  Typography
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { Staff, ListInfo, Tag } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation, useParams } from "react-router-dom";
import {
  createTagApi,
  deleteTagApi,
  fetchListInfoApi,
  fetchMyListsTagsApi,
  fetchPublicTagsApi,
  fetchTopActorsForListApi,
  fetchTopDirectorsForListApi,
  saveListApi,
  updateListApi
} from "../../api";
import { textfieldSx } from "../content/createAccount/textfieldGroup";
import { IoClose } from "react-icons/io5";
import { routePaths } from "../../types/enums";
import { BsFillInfoCircleFill } from "react-icons/bs";

type Props = {
  listVisibility?: boolean;
};

const ListFilters: FC<Props> = (props) => {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const { listId, listName } = useParams();
  const location = useLocation();
  const [tags, setTags] = useState<Tag[]>();
  const [openedDialog, setToggleDialog] = useState<boolean>(false);
  const [tagName, setTagName] = useState<string>("");
  const [tagNameError, setTagNameError] = useState<string | undefined>(undefined);
  const [successfullyCreated, setSuccessfullyCreated] = useState<boolean>(false);
  const [successfullyDeleted, setSuccessfullyDeleted] = useState<boolean>(false);
  const [successfullySaved, setSuccessfullySaved] = useState<boolean>(false);
  const [successfullyUpdate, setSuccessfullyUpdated] = useState<boolean>(false);
  const [conflict, setConflict] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(props.listVisibility || false);
  const [topActors, setTopActors] = useState<Staff[]>();
  const [topDirectors, setTopDirectors] = useState<Staff[]>();

  useEffect(() => {
    const getTags = async () => {
      if (currentUser.token && currentUser.userId) {
        if (listId) {
          const response = await fetchListInfoApi(listId, currentUser.token);
          if (response.status === 200) {
            setTags((response.data as ListInfo).tagsDtos);
          }
        } else if (location.pathname.includes(routePaths.myLists)) {
          const response = await fetchMyListsTagsApi(currentUser.userId, currentUser.token);
          if (response && response.status === 200) {
            setTags(response.data);
          }
        } else {
          const response = await fetchPublicTagsApi(currentUser.token);
          if (response && response.status === 200) {
            setTags(response.data);
          }
        }
      }
    };
    getTags();
    return () => {
      setTags(undefined);
    };
  }, [successfullyCreated, successfullyDeleted, location.pathname]);

  useEffect(() => {
    const getTopActors = async () => {
      if (currentUser.token && listId) {
        const response = await fetchTopActorsForListApi(listId, currentUser.token);
        if (response && response.status === 200) {
          setTopActors(response.data);
        }
      }
    };
    const getTopDirectors = async () => {
      if (currentUser.token && listId) {
        const response = await fetchTopDirectorsForListApi(listId, currentUser.token);
        if (response && response.status === 200) {
          setTopDirectors(response.data);
        }
      }
    };
    getTopActors();
    getTopDirectors();
  }, []);

  useEffect(() => {
    setVisible(props.listVisibility || false);
  }, [props.listVisibility]);

  const createTag = async () => {
    if (tagName.length === 0) {
      setTagNameError("Title of the list cannot be empty");
    }
    if (tagName.length !== 0 && currentUser.userId && currentUser.token && listId) {
      const response = await createTagApi(tagName, currentUser.userId, listId, currentUser.token);
      if (response && response.status === 200) {
        setSuccessfullyCreated(true);
        setToggleDialog(false);
      }
    }
  };

  const deleteTag = async (tagId: string) => {
    if (currentUser.userId && currentUser.token) {
      const response = await deleteTagApi(tagId, currentUser.userId, currentUser.token);
      if (response && response.status === 200) {
        setSuccessfullyDeleted(true);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      createTag();
    }
  };

  const saveList = async () => {
    if (currentUser.userId && listId && currentUser.token) {
      const response = await saveListApi(currentUser.userId, listId, currentUser.token);
      if (response && response.status === 200) {
        setSuccessfullySaved(true);
      } else if (response.status === 409) {
        setConflict(true);
      }
    }
  };

  const updateListVisibility = async (visibility: boolean) => {
    if (currentUser.userId && currentUser.token && listId && listName) {
      const response = await updateListApi(
        listName,
        listId,
        visibility,
        currentUser.userId,
        currentUser.token
      );
      if (response && response.status === 200) {
        setSuccessfullyUpdated(true);
      }
    }
  };

  return (
    <>
      <div className="list-filters">
        <div className="container">
          <Accordion
            sx={{
              backgroundColor: "black",
              margin: "8px",
              width: "100%",
              borderRadius: "20px"
            }}>
            <AccordionSummary expandIcon={<MdOutlineExpandMore color="white" size="24px" />}>
              <div className="title">Tags</div>
            </AccordionSummary>
            <AccordionDetails>
              {tags ? (
                tags.map((tag) => {
                  return (
                    <div className="genre-item" key={tag.id}>
                      {tag.name}
                      {listId && !location.pathname.includes(routePaths.publicSpecificList) && (
                        <IoClose
                          style={{ marginLeft: "8px", marginTop: "4px", cursor: "pointer" }}
                          onClick={() => deleteTag(tag.id)}
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <CircularProgress sx={{ color: "grey" }} />
              )}
            </AccordionDetails>
          </Accordion>
          {listId && (
            <>
              <Accordion
                sx={{
                  backgroundColor: "black",
                  margin: "8px",
                  width: "100%",
                  borderRadius: "20px"
                }}>
                <AccordionSummary expandIcon={<MdOutlineExpandMore color="white" size="24px" />}>
                  <div className="title">Top actors</div>
                </AccordionSummary>
                <AccordionDetails>
                  {topActors ? (
                    topActors.map((actor) => {
                      return (
                        <div className="genre-item" key={actor.id}>
                          {actor.name}
                        </div>
                      );
                    })
                  ) : (
                    <CircularProgress sx={{ color: "grey" }} />
                  )}
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  backgroundColor: "black",
                  margin: "8px",
                  width: "100%",
                  borderRadius: "20px"
                }}>
                <AccordionSummary expandIcon={<MdOutlineExpandMore color="white" size="24px" />}>
                  <div className="title">Top directors</div>
                </AccordionSummary>
                <AccordionDetails>
                  {topDirectors ? (
                    topDirectors.map((director) => {
                      return (
                        <div className="genre-item" key={director.id}>
                          {director.name}
                        </div>
                      );
                    })
                  ) : (
                    <CircularProgress sx={{ color: "grey" }} />
                  )}
                </AccordionDetails>
              </Accordion>
            </>
          )}
          {listId && !location.pathname.includes(routePaths.publicSpecificList) && (
            <>
              <Button
                variant="contained"
                onClick={() => setToggleDialog(true)}
                sx={{
                  fontSize: "small",
                  borderRadius: "20px",
                  color: "white",
                  maxHeight: "40px",
                  height: "40px",
                  maxWidth: "128px",
                  width: "128px",
                  backgroundColor: "#8685ef",
                  transition: "background-color 0.3s",
                  margin: "32px 0",
                  "&:hover": {
                    backgroundColor: "#6665b5"
                  }
                }}>
                Add tag
              </Button>
              <div className="visibility-container">
                {visible ? "Public" : "Private"}
                <Switch
                  checked={visible}
                  onChange={(event) => {
                    setVisible(event.target.checked);
                    updateListVisibility(event.target.checked);
                  }}
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
                      other users. Everyone can see the content of the list.
                    </Typography>
                  }
                  placement="right">
                  <IconButton sx={{ color: "grey" }}>
                    <BsFillInfoCircleFill fontSize={12} />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
          {listId && location.pathname.includes(routePaths.publicSpecificList) && (
            <Button
              variant="contained"
              onClick={saveList}
              sx={{
                fontSize: "small",
                borderRadius: "20px",
                color: "white",
                maxHeight: "40px",
                height: "40px",
                maxWidth: "128px",
                width: "128px",
                backgroundColor: "#8685ef",
                transition: "background-color 0.3s",
                margin: "32px 0",
                "&:hover": {
                  backgroundColor: "#6665b5"
                }
              }}>
              Save list
            </Button>
          )}
        </div>
      </div>

      <Dialog
        open={openedDialog}
        onClose={() => {
          setTagName("");
          setTagNameError(undefined);
          setToggleDialog(false);
        }}
        sx={{
          "& .MuiPaper-root": { backgroundColor: "black", borderRadius: "30px" },
          "& .MuiTypography-root": { color: "white", fontWeight: "bold" }
        }}>
        <DialogTitle sx={{ textAlign: "center" }}>Create Tag</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <TextField
            label="Introduce tag name"
            fullWidth
            onKeyDown={(event) => handleKeyDown(event)}
            onChange={(event) => {
              setTagName(event.target.value), setTagNameError(undefined);
            }}
            error={tagNameError ? true : false}
            helperText={tagNameError}
            sx={{ ...textfieldSx, margin: "16px 16px 0 16px" }}
          />
          <Tooltip
            title={
              <Typography fontSize={12}>
                You can create a tag and assign it to the list. The tag is going to be publicly
                visible.
              </Typography>
            }
            placement="right">
            <IconButton sx={{ color: "grey" }}>
              <BsFillInfoCircleFill fontSize={12} />
            </IconButton>
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={createTag}
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
      <Snackbar
        open={successfullySaved}
        autoHideDuration={3000}
        onClose={() => setSuccessfullySaved(false)}
        message="List successfully added"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
      <Snackbar
        open={successfullyUpdate}
        autoHideDuration={3000}
        onClose={() => setSuccessfullyUpdated(false)}
        message="List successfully updated"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
      <Snackbar
        open={successfullyDeleted}
        autoHideDuration={3000}
        onClose={() => setSuccessfullyDeleted(false)}
        message="Tag successfully deleted"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
      <Snackbar
        open={successfullyCreated}
        autoHideDuration={3000}
        onClose={() => setSuccessfullyCreated(false)}
        message="Tag successfully created"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
      <Snackbar
        open={conflict}
        autoHideDuration={3000}
        onClose={() => setConflict(false)}
        message="This list has already been saved."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ borderRadius: "30px" }}
      />
    </>
  );
};

export default ListFilters;
