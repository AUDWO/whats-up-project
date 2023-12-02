import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

//styled
import HomeWraper from "../StyledComponents/HomeStyle/HomeWrapper";

//Components
import MainSideBarCp from "../Components/MainSideBar/MainSideBarCp";
import HomeContentsCp from "../Components/HomeContent/HomeContentsCp";
import Section3 from "../Components/Section3/Section3";

//atoms
import userInfoAtom from "../store/userState/userAtom";
import stateUpdateAtom from "../store/stateUpdateAtom";

const Home = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const contentChange = useRecoilValue(stateUpdateAtom("contentChange"));
  const postUpdate = useRecoilValue(stateUpdateAtom("post"));
  const userInfoUpdate = useRecoilValue(stateUpdateAtom("userInfo"));

  useEffect(() => {
    const fetchuserInfoData = async () => {
      try {
        const response = await axios.get("/page/user-info");
        setUserInfo({ ...response.data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchuserInfoData();
  }, [contentChange, postUpdate, userInfoUpdate]);

  console.log(userInfo, "userInfo");

  return (
    <HomeWraper>
      <MainSideBarCp position={"fixed"} />
      <HomeContentsCp />
      <Section3 />
    </HomeWraper>
  );
};

export default Home;
