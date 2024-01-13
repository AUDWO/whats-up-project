import React, { useState } from "react";
import axios from "axios";
import {
  MoreCommentTitle,
  MoreCommnetInputWrapper,
  MoreCommentInput,
  MoreCommentInputIcon,
  CommentPostButton,
} from "../../../../StyledComponents/CommonCpStyle/More/MoreComment/MoreCommentCpSt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserInfoQuery from "../../../../customHooks/userInfoQuery";
import { useSetRecoilState } from "recoil";
import ModalOpenAtom from "../../../../store/ModalOpenAtom";

const MoreCommentInputCp = ({ storyId, diaryId }) => {
  const userInfo = UserInfoQuery();
  const [commentContent, setCommentContent] = useState("");

  const createStoryComment = async () => {
    return await axios.post("/comment/story", {
      content: commentContent,
      StoryId: storyId,
    });
  };

  const createDiaryComment = async () => {
    return await axios.post("/comment/diary", {
      content: commentContent,
      DiaryId: diaryId,
    });
  };

  const queryClient = useQueryClient();
  const setLoginRequestMdOpen = useSetRecoilState(
    ModalOpenAtom("loginRequestMd")
  );

  const { mutate: handlePostDiaryComment } = useMutation({
    mutationFn: createDiaryComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`diaryComments-${diaryId}`],
      });
      setCommentContent("");
    },
  });

  const { mutate: handlePostStoryComment } = useMutation({
    mutationFn: createStoryComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`storyComments-${storyId}`],
      });
      setCommentContent("");
    },
  });

  return (
    <>
      <MoreCommentTitle>댓글</MoreCommentTitle>
      <MoreCommnetInputWrapper>
        <MoreCommentInputIcon />
        <MoreCommentInput
          onClick={() => {
            if (!userInfo.loginCheck) {
              setLoginRequestMdOpen(true);
            }
          }}
          placeholder={
            userInfo.loginCheck
              ? "댓글을 입력해 주세요!"
              : "로그인 후 댓글 이용이 가능합니다."
          }
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
          readOnly={!userInfo.loginCheck}
        />
        <CommentPostButton
          comment={commentContent}
          onClick={() => {
            if (commentContent) {
              if (diaryId) {
                handlePostDiaryComment();
              }
              if (storyId) {
                handlePostStoryComment();
              }
            }
          }}
        >
          게시
        </CommentPostButton>
      </MoreCommnetInputWrapper>
    </>
  );
};

export default MoreCommentInputCp;
