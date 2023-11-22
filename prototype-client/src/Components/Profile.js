import React from "react";

import {
  ProfileImg,
  ProfileWrapper,
} from "../StyledComponents/HomeStyle/ProfileStyle/ProfileCpSt";

import { BasicProfileImg } from "../StyledComponents/CommonCpStyle/Icon/BasicProfileIcom";

const Profile = ({ nickname, profileImg }) => {
  return (
    <ProfileWrapper>
      {profileImg ? (
        <ProfileImg src={profileImg} />
      ) : (
        <BasicProfileImg fontSize={"40px"} />
      )}
      <div>{nickname}</div>
    </ProfileWrapper>
  );
};

export default Profile;
