import React from "react";

import {
  ProfileImg,
  ProfileWrapper,
} from "../../../StyledComponents/HomeStyle/ProfileStyle/ProfileCpSt";

import { BasicProfileImg } from "../../../StyledComponents/CommonCpStyle/Icon/BasicProfileIcom";

import { useRecoilValue } from "recoil";
import userInfoAtom from "../../../store/userState/userAtom";

const ProfileCp = ({ fontSize }) => {
  const userInfo = useRecoilValue(userInfoAtom);
  return (
    <ProfileWrapper>
      {userInfo.profileImg ? (
        <ProfileImg src={userInfo.profileImg} fontSize={fontSize} />
      ) : (
        <BasicProfileImg fontSize={fontSize} />
      )}
      <div>{userInfo.nickname}</div>
    </ProfileWrapper>
  );
};

export default ProfileCp;
