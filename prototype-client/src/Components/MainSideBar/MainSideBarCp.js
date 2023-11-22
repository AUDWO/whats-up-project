import React from "react";
import { useNavigate } from "react-router-dom";

//Styled-Components
import {
  SideBarWapper,
  WebTitleDiv,
  MainIcon,
  FontColor,
} from "../../StyledComponents/MainSideBar/MainSideBarCpSt";

import WebTitle from "../../StyledComponents/LoginStyle/WebTitle";
import WebTitleWrap from "../../StyledComponents/LoginStyle/WebTitleWrap";

//Component
import MainSideBarMenuCp from "./MainSideBarMenuCp";

const MainSideBarCp = ({ position }) => {
  const navigate = useNavigate();

  return (
    <SideBarWapper width={"320px"} position={position}>
      <WebTitleDiv>
        <WebTitleWrap>
          <MainIcon />
          <WebTitle
            height={"60px"}
            onClick={() => {
              navigate("/home");
            }}
          >
            <div>
              <FontColor>W</FontColor>
              <FontColor>H</FontColor>
              <FontColor>A</FontColor>
              <FontColor>T</FontColor>
              <FontColor color="#f7dd07">'</FontColor>
              <FontColor>S</FontColor>
              <FontColor> </FontColor>
              <FontColor>U</FontColor>
              <FontColor>P</FontColor>
            </div>
          </WebTitle>
        </WebTitleWrap>
      </WebTitleDiv>
      <MainSideBarMenuCp />
    </SideBarWapper>
  );
};

export default MainSideBarCp;
