import React from "react";

//styled
import HomeWraper from "../StyledComponents/HomeStyle/HomeWrapper";

//Components
import MainSideBarCp from "../Components/MainSideBar/MainSideBarCp";
import HomeContentsCp from "../Components/HomeContent/HomeContentsCp";
import CheckUserCp from "../Components/HomeContent/CheckUser/CheckUserCp";
//import { UserInfoProvider } from "../contextApi/UserInfoProvider";

const Home = () => {
  return (
    <HomeWraper>
      <MainSideBarCp position={"fixed"} />
      <HomeContentsCp />
      <CheckUserCp />
    </HomeWraper>
  );
};

export default Home;
