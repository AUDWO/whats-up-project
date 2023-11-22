import React from "react";
import { Outlet } from "react-router-dom";

//Component
import MainSideBarCp from "./Components/MainSideBar/MainSideBarCp";

//Styled-Component
import HomeWraper from "./StyledComponents/HomeStyle/HomeWrapper";

const DashboardWrapper = () => {
  return (
    <HomeWraper>
      <MainSideBarCp />
      <Outlet />
    </HomeWraper>
  );
};

export default DashboardWrapper;
