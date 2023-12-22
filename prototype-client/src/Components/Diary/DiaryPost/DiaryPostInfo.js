import React from "react";
import {
  DiaryPostInfoWrapper,
  DiaryPostDate,
  DiaryPostTitleWrapper,
  DiaryPostUserWrapper,
  UserProfileImg,
  UserNickname,
} from "../../../StyledComponents/DiaryStyle/DiaryPost";

const DiaryPostInfo = ({ diaryInfo }) => {
  const dateObject = new Date(diaryInfo.createdAt);
  const year = dateObject.getUTCFullYear();
  const month = dateObject.getUTCMonth() + 1;
  const day = dateObject.getUTCDate();

  return (
    <DiaryPostInfoWrapper>
      <DiaryPostDate>{`${year}-${month}-${day}`}</DiaryPostDate>
      <DiaryPostTitleWrapper>{diaryInfo.title}</DiaryPostTitleWrapper>
      <DiaryPostUserWrapper>
        <UserProfileImg src={diaryInfo.User.profileImg} />
        <UserNickname>{diaryInfo.User.nickname}</UserNickname>
      </DiaryPostUserWrapper>
    </DiaryPostInfoWrapper>
  );
};

export default DiaryPostInfo;
