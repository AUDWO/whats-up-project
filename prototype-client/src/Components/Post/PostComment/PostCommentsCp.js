import React from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

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
import PostCommentInput from "../PostCommentInput/PostCommentInput";

//Atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";

const CommentModalCp = ({ postId }) => {
  const [modalOpen, setModalOpen] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postId}`)
  );
  const handleClick = () => {
    setModalOpen(false);
  };

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
            <PostCommentCp comment={comment} />
          ))}
        </CommentsWrapper>
        <PostCommentInput postId={postId} />
      </CommentModalWrapper>
    </>
  );
};

export default CommentModalCp;
