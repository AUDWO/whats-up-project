import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";

//Styled-Component
import {
  CommentConfigModal,
  CommentConfigModalOption,
  CommentDeleteIcon,
  CommentConfigCloseIcon,
} from "../../../StyledComponents/CommonCpStyle/Comment/CommentConfigModalCpSt";

//Atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";

//Component
import CustomUseMutation from "../../../customHooks/CustomUseMutation";

const CommentConfigModalCp = ({
  contentType,
  commentId,
  commentType,
  contentId,
  commentIdOfReplyComment,
  offset,
}) => {
  const setCommentConfigModalOpen = useSetRecoilState(
    ModalOpenAtom(`${contentType}CommentConfigModal${commentId}`)
  );

  const CommentConfigModalRef = useRef(null);

  useEffect(() => {
    const handleOutClick = (e) => {
      if (!CommentConfigModalRef.current?.contains(e.target)) {
        setCommentConfigModalOpen(false);
      }
    };
    document.addEventListener("click", handleOutClick);
    return () => {
      document.removeEventListener("click", handleOutClick);
    };
  }, []);

  const queryKeyArrMadeByCommentType = (() => {
    if (commentType === "comment") return `${contentType}Comments-${contentId}`;
    if (commentType === "replyComment")
      return [`${contentType}ReplyComments-${commentIdOfReplyComment}`];
  })();

  const deleteComments = async () => {
    try {
      return await axios.delete(`/delete/${contentType}-comment/${commentId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate } = CustomUseMutation(
    deleteComments,
    queryKeyArrMadeByCommentType,
    () => {
      setCommentConfigModalOpen(false);
    }
  );

  const handleCommentDelete = async () => {
    try {
      mutate();
    } catch (error) {
      console.error("Delete action failed", error);
    }
  };

  const { top, left, right, bottom } = offset;

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
          handleCommentDelete();
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
