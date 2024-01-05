import React from "react";

//Stlyed-Components
import { ProfilePageWrapper } from "../../StyledComponents/ProfileStyle/ProfileCpSt";
//Components
import ProfileImgCp from "./ProfileImgCp";
import ProfileContentsCp from "./ProfileContentsCp";

const ProfileCp = ({ otherUserId }) => {
  //프로필 설정 모달에서 프로필 정보 변경 후 프로필 업데이트

  return (
    <>
      <ProfilePageWrapper>
        <ProfileImgCp otherUserId={otherUserId} />
        <ProfileContentsCp otherUserId={otherUserId} />
      </ProfilePageWrapper>
    </>
  );
};

export default ProfileCp;
