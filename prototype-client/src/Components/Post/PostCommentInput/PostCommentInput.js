import React, { useState } from "react";
import axios from "axios";

//Styled-Components
import {
  CommentInputWrapper,
  CommentInput,
  CommentPostButton,
} from "../../../StyledComponents/PostStyle/PostComment/PostCommentsCpSt";

//Component
import CustomUseMutation from "../../../customHooks/CustomUseMutation";

const PostCommentInput = ({ postId }) => {
  const [commentContent, setCommentContent] = useState("");

  const fetchPostComments = async () => {
    await axios.post("/comment/post", {
      content: commentContent,
      PostId: postId,
    });
  };

  const { mutate: getPostComments } = CustomUseMutation(
    fetchPostComments,
    [`postComments-${postId}`],
    () => {
      setCommentContent("");
    }
  );

  return (
    <CommentInputWrapper>
      <CommentInput
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <CommentPostButton
        comment={commentContent}
        onClick={() => {
          getPostComments();
        }}
      >
        게시
      </CommentPostButton>
    </CommentInputWrapper>
  );
};

export default PostCommentInput;
