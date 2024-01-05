import React, { useRef, useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";

//Styled-Component
import {
  MakePostModal,
  MakePostWrapper,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ProfileCp from "../Common/Profile/ProfileCp";

//Custom hook
import UserInfoQuery from "../../customHooks/userInfoQuery";

const MakePostModalCp = () => {
  const setMakePostModalOpen = useSetRecoilState(
    ModalOpenAtom("makePostModal")
  );

  const [postimgUrl, setPostImgUrl] = useRecoilState(imgUrlAtom("postImgUrl"));
  console.log(postimgUrl, "?>?>?>?>?><><><>?<?<?<?<");
  const postModalBackground = useRef();
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);

  const [likeControl, setLikeCountControl] = useRecoilState(
    toggleValueAtom("postLike")
  );
  const [commentControl, setCommentControl] = useRecoilState(
    toggleValueAtom("postCommentForbid")
  );
  const [contentControl, setContentControl] = useRecoilState(
    toggleValueAtom("postContent")
  );

  const userInfo = UserInfoQuery();

  const handleReset = () => {
    setCommentControl(false);
    setContentControl(false);
    setLikeCountControl(false);
    setPostImgUrl(false);
  };

  const handleSubmitPost = async () => {
    try {
      const postResponse = await axios.post("/post", {
        url: postimgUrl,
        content: content,
        title: title,
        likeControl: !likeControl,
        commentControl: !commentControl,
        contentControl: !contentControl,
        likeCount: 0,
        commentCount: 0,
      });

      return postResponse;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async () => {
    if (!postimgUrl) {
      return;
    }
    try {
      const response = await handleSubmitPost();
      setMakePostModalOpen(false);
      handleReset();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: handlePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["postContentsInfo"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myUserInfo"],
      });
    },
  });

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
        <ProfileCp
          pfI={{ width: "50px", height: "50px", basic: "50px" }}
          pfIW={{}}
          pfW={{
            margin: { t: "20", b: "20" },
            padding: { t: "10", l: "10", r: "10", b: "10" },
            justifyC: "flex-start",
          }}
          pfN={{ fontS: "16px", fontW: "600" }}
          pfInfo={userInfo}
        />

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
              mutate();
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
