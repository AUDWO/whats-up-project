import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

//Styled-Component
import {
  CommentClosingIcon,
  CommentModalWrapper,
  CommentOptionWrapper,
  CommentTitle,
  CommentsWrapper,
} from "../../../StyledComponents/PostStyle/PostComment/PostCommentsCpSt";

//Component
import PostCommentCp from "./PostCommentCp";

//Atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";

import { useUserInfoValue } from "../../../contextApi/UserInfoProvider";
import { useQuery } from "@tanstack/react-query";
import PostCommentInput from "../PostCommentInput/PostCommentInput";

const CommentModalCp = ({ postId }) => {
  const [modalOpen, setModalOpen] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postId}`)
  );
  const handleClick = () => {
    setModalOpen(false);
  };

  const userInfo = useUserInfoValue();

  const getPostComments = async () => {
    try {
      const response = await axios.get(`/page/render-post-comment/${postId}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useQuery({
    queryKey: [`postComments-${postId}`],
    queryFn: getPostComments,
  });

  return (
    <>
      <CommentModalWrapper click={modalOpen}>
        <CommentOptionWrapper>
          <CommentTitle>댓글</CommentTitle>
          <CommentClosingIcon onClick={handleClick}>X</CommentClosingIcon>
        </CommentOptionWrapper>
        <CommentsWrapper>
          {data?.data.map((comment) => (
            <>
              {comment.UserId === userInfo.id ? (
                <PostCommentCp comment={comment} myComment={true} />
              ) : (
                <PostCommentCp comment={comment} />
              )}
            </>
          ))}
        </CommentsWrapper>
        <PostCommentInput postId={postId} />
      </CommentModalWrapper>
    </>
  );
};

export default CommentModalCp;
