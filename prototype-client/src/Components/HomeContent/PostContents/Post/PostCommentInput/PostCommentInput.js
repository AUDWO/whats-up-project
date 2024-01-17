import React, { useState } from "react";
import axios from "axios";

//Styled-Components

import {
  CommentInputWrapper,
  CommentInput,
  CommentPostButton,
} from "../../../../../StyledComponents/PostStyle/PostComment/PostCommentsCpSt";

//Component
import CustomUseMutation from "../../../../../customHooks/CustomUseMutation";
import UserInfoQuery from "../../../../../customHooks/UserInfoQuery";

const PostCommentInput = ({ postId }) => {
  const userInfo = UserInfoQuery();
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
        readOnly={!userInfo.loginCheck}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder={
          userInfo.loginCheck
            ? "댓글을 입력해 주세요"
            : "로그인 후 댓글 이용이 가능합니다."
        }
      />
      <CommentPostButton
        comment={commentContent}
        onClick={() => {
          if (commentContent) {
            getPostComments();
          }
        }}
      >
        게시
      </CommentPostButton>
    </CommentInputWrapper>
  );
};

export default PostCommentInput;
