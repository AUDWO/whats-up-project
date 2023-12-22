import React from "react";
import { useRecoilState } from "recoil";

//Styled-Components
import {
  PostsInfoWrapper,
  CountWrapper,
  CountTitle,
  CountNumber,
} from "../../StyledComponents/ProfileStyle/ProfilePostInfoCpSt";

//Atom;
import toggleValueAtom from "../../store/ToggleValueAtom";
import defaultTrueToggleValueAtom from "../../store/defaultTrueToggleValueAtom";

const ProfilePostsInfoCp = ({ contentsInfo: userInfo }) => {
  const [diaryContentsOpen, setDiaryContentsOpen] = useRecoilState(
    toggleValueAtom(`diaryContentsOpen${userInfo.id}`)
  );
  const [postContentsOpen, setPostContentsOpen] = useRecoilState(
    defaultTrueToggleValueAtom(`postContentsOpen${userInfo.id}`)
  );

  return (
    <PostsInfoWrapper>
      <CountWrapper>
        <CountTitle
          type={postContentsOpen}
          onClick={() => {
            setDiaryContentsOpen(false);
            setPostContentsOpen(true);
          }}
        >
          게시물
        </CountTitle>
        <CountNumber marginL={"10"} paddingT={"10"}>
          {userInfo.postslength}
        </CountNumber>
      </CountWrapper>
      <CountWrapper marginL={"50"}>
        <CountTitle
          type={diaryContentsOpen}
          onClick={() => {
            setPostContentsOpen(false);
            setDiaryContentsOpen(true);
          }}
        >
          일기
        </CountTitle>
        <CountNumber marginL={"10"} paddingT={"10"}>
          {userInfo.diarieslength}
        </CountNumber>
      </CountWrapper>
    </PostsInfoWrapper>
  );
};

export default ProfilePostsInfoCp;
