import React, { useRef, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

//Styled-Component
import {
  MakePostModal,
  MakePostWrapper,
  MakePostProfileWrapper,
  MakePostProfileImg,
  MakePostNickname,
  MakePostContentWrapper,
  MakePostContent,
  MakePostFormWrapper,
  MakePostButton,
  MakePostCancelButton,
  MakePostOptionWrapper,
  EmptySpace,
  MakePostTitle,
} from "../../StyledComponents/MakePostStyle/MakePostModalCpSt";

//Components
import MakePostDragDownImgCp from "./MakePostDragDownImgCp";
import PostAdvancedSetupCp from "./PostAdvancedSetupCp";

//Atoms
import ModalOpenAtom from "../../store/ModalOpenAtom";
import toggleValueAtom from "../../store/ToggleValueAtom";
import imgUrlAtom from "../../store/imgUrlAtom";
import userInfoAtom from "../../store/userState/userAtom";
import stateUpdateAtom from "../../store/stateUpdateAtom";

const MakePostModalCp = () => {
  const setMakePostModalOpen = useSetRecoilState(
    ModalOpenAtom("makePostModal")
  );

  const [postimgUrl, setPostImgUrl] = useRecoilState(imgUrlAtom("postImg"));
  const postModalBackground = useRef();
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [likeCountControl, setLikeCountControl] = useRecoilState(
    toggleValueAtom("postLikeCount")
  );
  const [commentControl, setCommentControl] = useRecoilState(
    toggleValueAtom("postCommentForbid")
  );
  const [contentControl, setContentControl] = useRecoilState(
    toggleValueAtom("postContent")
  );
  const [contentUpdate, setContentUpdate] = useRecoilState(
    stateUpdateAtom("contentUpdate")
  );

  const userInfo = useRecoilValue(userInfoAtom);

  const formData = new FormData();
  formData.append("img", postimgUrl);

  const handleReset = () => {
    setCommentControl(false);
    setContentControl(false);
    setLikeCountControl(false);
    setPostImgUrl(false);
  };

  const handlePost = async () => {
    if (!postimgUrl) {
      return;
    }
    try {
      const imgDataResponse = await axios.post("/post/img", formData);

      const postResponse = await axios.post("/post", {
        url: imgDataResponse.data.url,
        content: content,
        title: title,
        likeCountControl: likeCountControl,
        commentControl: !commentControl,
        contentControl: !contentControl,
        likeCount: 0,
        commentCount: 0,
      });

      setContentUpdate(!contentUpdate);
      setMakePostModalOpen(false);
      handleReset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MakePostModal
      ref={postModalBackground}
      onClick={(e) => {
        if (e.target === postModalBackground.current) {
          setMakePostModalOpen(false);
        }
      }}
    >
      <MakePostWrapper>
        <MakePostProfileWrapper>
          <MakePostProfileImg>{userInfo.profileImg}</MakePostProfileImg>
          <MakePostNickname>{userInfo.nickname}</MakePostNickname>
        </MakePostProfileWrapper>
        <MakePostDragDownImgCp />
        <div>
          <MakePostTitle
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        {!contentControl && (
          <MakePostContentWrapper>
            <MakePostContent
              placeholder="내용을 입력하세요!"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </MakePostContentWrapper>
        )}
        <MakePostOptionWrapper>
          <PostAdvancedSetupCp />
        </MakePostOptionWrapper>
        <MakePostFormWrapper>
          <MakePostButton
            onClick={(e) => {
              e.preventDefault();
              handlePost();
            }}
          >
            게시하기
          </MakePostButton>
          <MakePostCancelButton
            onClick={() => {
              setMakePostModalOpen(false);
            }}
          >
            삭제하기
          </MakePostCancelButton>
        </MakePostFormWrapper>
        <div>
          <EmptySpace></EmptySpace>
        </div>
      </MakePostWrapper>
    </MakePostModal>
  );
};

export default MakePostModalCp;
