import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";

//Styled-Component
import {
  CommentConfigModal,
  CommentConfigModalOption,
  CommentDeleteIcon,
  CommentConfigCloseIcon,
} from "../../../StyledComponents/CommonCpStyle/Comment/CommentConfigModalCpSt";

//Atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import stateUpdateAtom from "../../../store/stateUpdateAtom";

const CommentConfigModalCp = ({ type, comment, top, left, right, bottom }) => {
  const [commentConfigModalOpen, setCommentConfigModalOpen] = useRecoilState(
    ModalOpenAtom(`${type}CommentConfigModal${comment.id}`)
  );

  const [commentCountUpdate, setCommentCountUpdate] = useRecoilState(
    stateUpdateAtom("comment")
  );
  //moreDiaryComment || moreStoryComment
  const [moreCommentUpdate, setMoreCommentUpdate] = useRecoilState(
    stateUpdateAtom(`moreCommentUpdate`)
  );
  const [postCommentUpdate, setPostCommentUpdate] = useRecoilState(
    stateUpdateAtom("postComment")
  );

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/delete/${type}-comment/${comment.id}`
      );
      if (type === "post") {
        setPostCommentUpdate(!postCommentUpdate);
        setCommentCountUpdate(!commentCountUpdate);
      }
      //type === diary || type === story
      if (!(type === "post")) setMoreCommentUpdate(!moreCommentUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  const CommentConfigModalRef = useRef(null);

  useEffect(() => {
    if (commentConfigModalOpen) {
      const handleClick = (e) => {
        if (!CommentConfigModalRef.current.contains(e.target)) {
          setCommentConfigModalOpen(false);
        }
        e.stopPropagation();
      };
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <CommentConfigModal
      ref={CommentConfigModalRef}
      bottom={bottom}
      top={top}
      right={right}
      left={left}
    >
      <CommentConfigModalOption
        onClick={() => {
          handleDelete();
        }}
      >
        <CommentDeleteIcon />
        삭제
      </CommentConfigModalOption>
      <CommentConfigModalOption
        onClick={() => {
          setCommentConfigModalOpen(false);
        }}
      >
        <CommentConfigCloseIcon />
        취소
      </CommentConfigModalOption>
    </CommentConfigModal>
  );
};

export default CommentConfigModalCp;
