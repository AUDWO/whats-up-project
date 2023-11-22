import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

//Styled-Components
import {
  ConfigWrapper,
  ConfigOptionTitle,
  ConfigOptionWrapper,
  ToggleSwitchWrapper,
  ToggleValueTitle,
  Toggle,
  ToggleSwitch,
  ToggleButton,
  PostButton,
  PostButtonWrapper,
  ContentTextarea,
} from "../../../StyledComponents/ProfileStyle/ProfileContentConfig/DiaryContentConfigOption";
import { Input } from "../../../StyledComponents/CommonCpStyle/Input/Input";

//Atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import stateUpdateAtom from "../../../store/stateUpdateAtom";

const PostContentConfigOptionCp = ({ contentInfo }) => {
  const [postTitle, setPostTitle] = useState(contentInfo.title);
  const [postContent, setPostContent] = useState(contentInfo.content);
  const [toggleLikeValue, setToggleLikeValue] = useState(
    contentInfo.likeControl
  );
  const [toggleCommentValue, setToggleCommentValue] = useState(
    contentInfo.commentControl
  );

  //프로필 컨텐츠 설정 모달창 닫기 함수
  const setContentConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileContentConfigModal")
  );

  //프로필 컨텐츠 정보 변경 후 업데이트 된 contents 받아오기
  const [contentUpdate, setContentUpdate] = useRecoilState(
    stateUpdateAtom("contentUpdate")
  );

  const handleChangePostInfo = async () => {
    try {
      if (postContent) {
        const response = await axios.patch(
          `/update/post-info/${contentInfo.id}`,
          {
            title: postTitle,
            content: postContent,
            likeControl: toggleLikeValue,
            commentControl: toggleCommentValue,
            contentControl: true,
          }
        );
      }
      if (!postContent) {
        const response = await axios.patch(
          `/update/post-info/${contentInfo.id}`,
          {
            title: postTitle,
            content: postContent,
            likeControl: toggleLikeValue,
            commentControl: toggleCommentValue,
          }
        );
      }
      setContentConfigModalOpen(false);
      setContentUpdate(!contentUpdate);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ConfigWrapper>
      <ConfigOptionWrapper height={"auto"} flexD={"column"}>
        <ConfigOptionTitle marginT={"15"}>제목</ConfigOptionTitle>
        <Input
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
          fontSize="15px"
          marginT="15"
          paddingB="5"
          backC="#ffffff"
          borderB={{ borderPx: "1px", color: "gray" }}
        />
      </ConfigOptionWrapper>
      <ConfigOptionWrapper height={"auto"} flexD={"column"}>
        <ConfigOptionTitle marginT={"15"}>내용</ConfigOptionTitle>
        <ContentTextarea
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        />
      </ConfigOptionWrapper>
      <ConfigOptionWrapper height={"auto"} flexD={"column"}>
        <ConfigOptionTitle marginT={"10"}>댓글 기능</ConfigOptionTitle>
        <ToggleSwitchWrapper>
          <ToggleValueTitle>OFF</ToggleValueTitle>
          <Toggle
            id="toggleComment"
            type="checkbox"
            hidden
            checked={toggleCommentValue}
            onChange={() => setToggleCommentValue(!toggleCommentValue)}
          />
          <ToggleSwitch htmlFor="toggleComment">
            <ToggleButton></ToggleButton>
          </ToggleSwitch>
          {toggleCommentValue ? (
            <ToggleValueTitle color={"#f7dd07"}>ON</ToggleValueTitle>
          ) : (
            <ToggleValueTitle>ON</ToggleValueTitle>
          )}{" "}
        </ToggleSwitchWrapper>
      </ConfigOptionWrapper>
      <ConfigOptionWrapper height={"auto"} flexD={"column"}>
        <ConfigOptionTitle marginT={"15"}>좋아요 기능</ConfigOptionTitle>
        <ToggleSwitchWrapper>
          <ToggleValueTitle>OFF</ToggleValueTitle>
          <Toggle
            id="toggleLike"
            type="checkbox"
            hidden
            checked={toggleLikeValue}
            onChange={() => setToggleLikeValue(!toggleLikeValue)}
          />
          <ToggleSwitch htmlFor="toggleLike">
            <ToggleButton></ToggleButton>
          </ToggleSwitch>
          {toggleLikeValue ? (
            <ToggleValueTitle color={"#f7dd07"}>ON</ToggleValueTitle>
          ) : (
            <ToggleValueTitle>ON</ToggleValueTitle>
          )}{" "}
        </ToggleSwitchWrapper>
      </ConfigOptionWrapper>
      <PostButtonWrapper>
        <PostButton
          onClick={() => {
            handleChangePostInfo();
          }}
        >
          저장하기
        </PostButton>
      </PostButtonWrapper>
    </ConfigWrapper>
  );
};

export default PostContentConfigOptionCp;
