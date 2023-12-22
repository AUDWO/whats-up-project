import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";

//Styled-Components
import {
  PostReplyInputWrapper,
  PostReplyInput,
  ReplyButtonWrapper,
  ReplyCancelButton,
  ReplyInputButton,
} from "../../../StyledComponents/PostStyle/PostReplyComment/PostReplyCommentInputSt";

//Atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PostReplyCommentInputCp = ({ comment }) => {
  const [replyCommentContent, setReplyCommentContent] = useState("");
  const setReplyInputOpen = useSetRecoilState(
    ModalOpenAtom(`replyComment${comment.id}`)
  );

  const createPostComment = async () => {
    try {
      const response = await axios.post("/comment/post", {
        content: replyCommentContent,
        PostId: comment.PostId,
        PostCommentId: comment.id,
      });
      return response;
    } catch (error) {
      console.log(`PostReplyComments Error ${error}`);
    }
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createPostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`postReplyComments-${comment.id}`],
      });
      setReplyCommentContent("");
    },
  });

  return (
    <PostReplyInputWrapper>
      <PostReplyInput
        value={replyCommentContent}
        onChange={(e) => {
          setReplyCommentContent(e.target.value);
        }}
      />
      <ReplyButtonWrapper>
        <ReplyCancelButton onClick={() => setReplyInputOpen(false)}>
          취소
        </ReplyCancelButton>
        <ReplyInputButton
          onClick={() => {
            mutate();
          }}
        >
          게시
        </ReplyInputButton>
      </ReplyButtonWrapper>
    </PostReplyInputWrapper>
  );
};

export default PostReplyCommentInputCp;
