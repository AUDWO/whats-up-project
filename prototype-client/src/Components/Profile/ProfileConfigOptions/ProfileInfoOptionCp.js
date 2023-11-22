import React from "react";

//Styled-Components
import {
  ConfigWrapper,
  ConfigOptionWrapper,
  PostButtonWrapper,
  PostButton,
} from "../../../StyledComponents/ProfileStyle/ProfileConfig/ProfileConfigCommonSt";

import {
  Email,
  ConfigOptionTitle,
} from "../../../StyledComponents/ProfileStyle/ProfileConfig/ProfileInfoOptionCpSt";

const ProfileInfoOptionCp = ({ userEmail }) => {
  return (
    <ConfigWrapper>
      <ConfigOptionWrapper height={"auto"} flexD={"column"}>
        <ConfigOptionTitle marginT={"15"}>이메일</ConfigOptionTitle>
        <Email marginT={"15"}>{userEmail}</Email>
      </ConfigOptionWrapper>
      <PostButtonWrapper>
        <PostButton onClick={() => {}}>닫기</PostButton>
      </PostButtonWrapper>
    </ConfigWrapper>
  );
};

export default ProfileInfoOptionCp;
