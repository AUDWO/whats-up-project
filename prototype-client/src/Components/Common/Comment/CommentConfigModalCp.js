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
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

  const handleDelete = async () => {
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

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      if (commentType === "comment") {
        queryClient.invalidateQueries({
          queryKey: [`${contentType}Comments-${contentId}`],
        });
      }
      if (commentType === "replyComment") {
        queryClient.invalidateQueries({
          queryKey: [`${contentType}ReplyComments-${commentIdOfReplyComment}`],
        });
      }
    },
  });

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
          mutate();
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
