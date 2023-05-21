import React from "react";
import "./App.scss";
import { Outlet } from "react-router-dom";
import Topbar from "./components/topbar";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";
import { Grid } from "@mui/material";

function App() {
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
            <Grid item xs={4}>
              <LeftSidebar />
            </Grid>
            <Grid item xs={8}>
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
}

export default App;
