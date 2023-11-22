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

const ProfilePostsInfoCp = ({ contentsInfo }) => {
  const [diaryContentsOpen, setDiaryContentsOpen] = useRecoilState(
    toggleValueAtom("diaryContentsOpen")
  );
  const [postContentsOpen, setPostContentsOpen] = useRecoilState(
    toggleValueAtom("postContentsOpen")
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
          {contentsInfo.postslength}
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
          {contentsInfo.diarieslength}
        </CountNumber>
      </CountWrapper>
    </PostsInfoWrapper>
  );
};

export default ProfilePostsInfoCp;
