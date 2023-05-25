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
        <Grid item xs={3}>
          <LeftSidebar />
        </Grid>
        <Grid item xs={9}>
          <div className="main">
            {location.pathname === "/" + routePaths.myLists && (
              <>
                <Lists
                  title="Watched list"
                  apiPath="/watched_list?userId="
                  useUserId
                  userId={currentUser.userId || ""}
                  token={currentUser.token || ""}
                />
                <Lists
                  title="Liked list"
                  apiPath="/liked_list?userId="
                  useUserId
                  userId={currentUser.userId || ""}
                  token={currentUser.token || ""}
                />
                <Lists
                  title="Custom Lists"
                  apiPath="/lists?tokenBody="
                  hasCreateButton
                  userId={currentUser.userId || ""}
                  token={currentUser.token || ""}
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
