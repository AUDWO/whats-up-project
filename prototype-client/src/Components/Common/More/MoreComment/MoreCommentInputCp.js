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

const MoreCommentInputCp = ({ storyId, diaryId }) => {
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
          placeholder="댓글을 입력하세요."
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
        />
        <CommentPostButton
          comment={commentContent}
          onClick={() => {
            if (diaryId) {
              handlePostDiaryComment();
            }
            if (storyId) {
              handlePostStoryComment();
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
