import React from "react";

//Stlyed-Components
import { ProfilePageWrapper } from "../../StyledComponents/ProfileStyle/ProfileCpSt";
//Components
import ProfileImgCp from "./ProfileImgCp";
import ProfileContentsCp from "./ProfileContentsCp";

import { useUserInfoValue } from "../../contextApi/UserInfoProvider";

const ProfileCp = ({ otherUserId }) => {
  //프로필 설정 모달에서 프로필 정보 변경 후 프로필 업데이트

  const userInfo = useUserInfoValue();

  if (otherUserId) {
    return (
      <>
        <ProfilePageWrapper>
          <ProfileImgCp otherUserId={otherUserId} />
          <ProfileContentsCp otherUserId={otherUserId} />
        </ProfilePageWrapper>
      </>
    );
  }

  return (
    <ProfilePageWrapper>
      <ProfileImgCp />
      <ProfileContentsCp />
    </ProfilePageWrapper>
  );
};

export default ProfileCp;
