import React, { useState } from "react";
import axios from "axios";
import {
  CommentInputWrapper,
  CommentInput,
  CommentPostButton,
} from "../../../StyledComponents/PostStyle/PostComment/PostCommentsCpSt";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PostCommentInput = ({ postId }) => {
  const [commentContent, setCommentContent] = useState("");

  const handlePostComment = async () => {
    await axios.post("/comment/post", {
      content: commentContent,
      PostId: postId,
    });
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handlePostComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`postComments${postId}`] });
      setCommentContent("");
    },
  });
  return (
    <CommentInputWrapper>
      <CommentInput
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <CommentPostButton
        comment={commentContent}
        onClick={() => {
          mutate();
        }}
      >
        게시
      </CommentPostButton>
    </CommentInputWrapper>
  );
};

export default PostCommentInput;
