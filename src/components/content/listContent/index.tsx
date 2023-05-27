import { useLocation } from "react-router-dom";
import LeftSidebar from "../../leftSidebar";
import "./style.scss";
import { Grid } from "@mui/material";
import { routePaths } from "../../../types/enums";
import Lists from "./lists";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const ListContent = () => {
  const location = useLocation();

  const { currentUser } = useSelector((state: RootState) => state.currentUser);

  return (
    <div className="list-content">
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={2.5}>
          <LeftSidebar />
        </Grid>
        <Grid item xs={9.5}>
          <div className="main">
            {location.pathname === "/" + routePaths.myLists ? (
              <>
                <Lists
                  title="Watched list"
                  apiPath="/watched_list?userId="
                  useUserId
                  userId={currentUser.userId || ""}
                  token={currentUser.token || ""}
                  canDeleteMovie
                />
                <Lists
                  title="Liked list"
                  apiPath="/liked_list?userId="
                  useUserId
                  userId={currentUser.userId || ""}
                  token={currentUser.token || ""}
                  canDeleteMovie
                />
                <Lists
                  title="Custom Lists"
                  apiPath="/lists?userId="
                  hasCreateButton
                  userId={currentUser.userId || ""}
                  token={currentUser.token || ""}
                  hasDeleteButton
                  canDeleteMovie
                />
                <Lists
                  title="Saved lists"
                  apiPath="/liked_lists?userId="
                  hasAddButton
                  userId={currentUser.userId || ""}
                  token={currentUser.token || ""}
                  hasDeleteButton
                  canDeleteMovie
                />
              </>
            ) : (
              <>
                <Lists
                  title="Public lists"
                  apiPath="/all_lists"
                  userId={""}
                  token={currentUser.token || ""}
                  hasPagination
                />
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ListContent;
