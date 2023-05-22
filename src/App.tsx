import "./App.scss";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Outlet } from "react-router-dom";
import Topbar from "./components/topbar";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";
import { Grid } from "@mui/material";

const App = () => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  return (
    <div className="app">
      <img src="./background.png" className="background" />
      <Grid container height="100%" sx={{ position: "absolute" }}>
        <Grid item xs={10}>
          <Grid container height="15%">
            <Grid item xs={12}>
              <Topbar />
            </Grid>
          </Grid>
          <Grid container height="85%">
            <Grid item xs={3}>
              <LeftSidebar />
            </Grid>
            <Grid item xs={9}>
              <Outlet />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <RightSidebar />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
