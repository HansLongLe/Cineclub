import "./style.scss";
import { Grid } from "@mui/material";
import AuthenticationButtonGroup from "./authenticationButtonGroup";
import SearchArea from "./searchArea";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserButton from "./userButton";

const Topbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  return (
    <div className="topbar">
      <Grid container height="100%">
        <Grid item xs={3}>
          {currentUser.token ? <UserButton /> : <AuthenticationButtonGroup />}
        </Grid>
        <Grid item xs={9}>
          <SearchArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default Topbar;
