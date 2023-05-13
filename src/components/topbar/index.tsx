import "./style.scss";
import { Grid } from "@mui/material";
import AuthenticationButtonGroup from "./authenticationButtonGroup";
import SearchArea from "./searchArea";

const Topbar = () => {
  return (
    <div className="topbar">
      <Grid container height="100%">
        <Grid item xs={3}>
          <AuthenticationButtonGroup />
        </Grid>
        <Grid item xs={9}>
          <SearchArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default Topbar;
