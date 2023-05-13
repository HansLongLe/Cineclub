import React from "react";
import "./App.scss";
import { Outlet } from "react-router-dom";
import Topbar from "./components/topbar";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";

function App() {
  return (
    <div className="app">
      <Topbar />
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
}

export default App;
