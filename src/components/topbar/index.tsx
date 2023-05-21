import "./style.scss";
import { Grid } from "@mui/material";
import AuthenticationButtonGroup from "./authenticationButtonGroup";
import SearchArea from "./searchArea";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserButton from "./userButton";
import { useState } from "react";

const Topbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  return (
    <div className="topbar">
      <Grid container height="100%">
        <Grid item xs={3}>
          {currentUser.token ? (
            <UserButton setSnackbarOpen={setSnackbarOpen} />
          ) : (
            <AuthenticationButtonGroup
              snackbarOpen={snackbarOpen}
              setSnackbarOpen={setSnackbarOpen}
            />
          )}
        </Grid>
        <Grid item xs={9}>
          <SearchArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default Topbar;
