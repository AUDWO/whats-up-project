import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

//Styled-Component
import {
  CommentInputWrapper,
  CommentInput,
  CommentPostButton,
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
import stateUpdateAtom from "../../../store/stateUpdateAtom";
import userInfoAtom from "../../../store/userState/userAtom";
import toggleValueAtom from "../../../store/ToggleValueAtom";

const CommentModalCp = ({ postId }) => {
  const [commentCountUpdate, setCommentCountUpdate] = useRecoilState(
    stateUpdateAtom(`comment${postId}`)
  );
  const [click, setClick] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postId}`)
  );
  const handleClick = () => {
    setClick(!click);
  };

  const [postCommentUpdate, setPostCommentUpdate] = useRecoilState(
    stateUpdateAtom(`postComment${postId}`)
  );

  const replyUpdate = useRecoilValue(stateUpdateAtom("postReply"));

  const userInfo = useRecoilValue(userInfoAtom);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const handlePostComment = async () => {
    await axios.post("/comment/post", {
      content: comment,
      PostId: postId,
    });
  };

  const isImgLoaded = useRecoilState(toggleValueAtom("isImgLoaded"));

  useEffect(() => {
    const fetchPostsComment = async () => {
      try {
        const response = await axios.get("/page/render-post-comment");
        const filteredComments = response.data.filter(
          (comment) =>
            comment.PostId === postId && comment.PostCommentId === null
        );
        setComments([...filteredComments]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostsComment();
  }, [postId, postCommentUpdate, replyUpdate]);

  if (comments) {
    return (
      <>
        <CommentModalWrapper click={click}>
          <CommentOptionWrapper>
            <CommentTitle>댓글</CommentTitle>
            <CommentClosingIcon onClick={handleClick}>X</CommentClosingIcon>
          </CommentOptionWrapper>
          <CommentsWrapper>
            {comments.map((comment) => (
              <>
                {comment.UserId === userInfo.id ? (
                  <PostCommentCp comment={comment} myComment={true} />
                ) : (
                  <PostCommentCp comment={comment} />
                )}
              </>
            ))}
          </CommentsWrapper>

          <CommentInputWrapper>
            <CommentInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <CommentPostButton
              comment={comment}
              onClick={() => {
                handlePostComment();
                setComment("");
                setPostCommentUpdate(!postCommentUpdate);
                setCommentCountUpdate(!commentCountUpdate);
              }}
            >
              게시
            </CommentPostButton>
          </CommentInputWrapper>
        </CommentModalWrapper>
      </>
    );
  }
};

export default CommentModalCp;
