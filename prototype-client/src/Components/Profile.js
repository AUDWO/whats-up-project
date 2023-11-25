import React from "react";

import {
  ProfileImg,
  ProfileWrapper,
} from "../StyledComponents/HomeStyle/ProfileStyle/ProfileCpSt";

import { BasicProfileImg } from "../StyledComponents/CommonCpStyle/Icon/BasicProfileIcom";

import styled from "styled-components";

const Profile = ({ nickname, profileImg }) => {
  return (
    <ProfileWrapper>
      {profileImg ? (
        <ProfileImg src={profileImg} />
      ) : (
        <BasicProfileImg fontSize={"40px"} />
      )}
      <ProfileNickName>{nickname}</ProfileNickName>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileNickName = styled.div`
  margin-left: 10px;
`;
