import React from "react";
import UserWrapper from "../StyledComponents/HomeStyle/Section3/UserWrapper";
import ProfileWrapper from "../StyledComponents/HomeStyle/Section3/ProfileWrapper";
import Profile from "./Profile";

import {
  ContentWrapper,
  DiaryWrapper,
  PostWrapper,
} from "../StyledComponents/HomeStyle/Section3/ContentWrapper";

import { useRecoilValue } from "recoil";
import userInfoAtom from "../store/userState/userAtom";

const User = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  return (
    <UserWrapper>
      <ProfileWrapper>
        <Profile nickname={userInfo.nickname} profileImg={userInfo.img} />
      </ProfileWrapper>

      <ContentWrapper>
        <PostWrapper>
          <div>게시글</div>
          <div>{userInfo.postslength}</div>
        </PostWrapper>
        <DiaryWrapper>
          <div>일기</div>
          <div>{userInfo.diarieslength}</div>
        </DiaryWrapper>
      </ContentWrapper>
    </UserWrapper>
  );
};

export default User;
