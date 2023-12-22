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

//Component
import CustomUseMutation from "../../../customHooks/CustomUseMutation";

const CommentConfigModalCp = ({
  contentType,
  commentId,
  commentType,
  contentId,
  commentIdOfReplyComment,
  top,
  left,
  right,
  bottom,
}) => {
  const [commentConfigModalOpen, setCommentConfigModalOpen] = useRecoilState(
    ModalOpenAtom(`${contentType}CommentConfigModal${commentId}`)
  );

  const deleteComments = async () => {
    try {
      const response = await axios.delete(
        `/delete/${contentType}-comment/${commentId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const CommentConfigModalRef = useRef(null);

  useEffect(() => {
    console.log("CommentConfigModalCp - useEffect");
    if (commentConfigModalOpen) {
    }
    const handleClick = (e) => {
      console.log("CommentConfigModalCp-handleClick");
      if (!CommentConfigModalRef.current.contains(e.target)) {
        setCommentConfigModalOpen(false);
      } else {
        e.stopPropagation();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const queryKeyMadeByCommentTYPE = (() => {
    if (commentType === "comment") return `${contentType}Comments-${contentId}`;
    if (commentType === "replyComment")
      return `${contentType}ReplyComments-${commentIdOfReplyComment}`;
  })();

  const { mutate: handleCommentDelete } = CustomUseMutation(
    deleteComments,
    queryKeyMadeByCommentTYPE
  );

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
