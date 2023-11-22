import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState, useRecoilState } from "recoil";

//Styled-Components
import {
  PostReplyInputWrapper,
  PostReplyInput,
  ReplyButtonWrapper,
  ReplyCancelButton,
  ReplyInputButton,
} from "../../../StyledComponents/PostStyle/PostReplyComment/PostReplyCommentInputSt";

//Atoms
import stateUpdateAtom from "../../../store/stateUpdateAtom";
import ModalOpenAtom from "../../../store/ModalOpenAtom";

const PostReplyCommentInputCp = ({ comment }) => {
  const [reply, setReply] = useState("");
  const setReplyInputOpen = useSetRecoilState(
    ModalOpenAtom(`replyComment${comment.id}`)
  );
  const [replyUpdate, setReplyUpdate] = useRecoilState(
    stateUpdateAtom("postReply")
  );

  const handlePostReplyComment = async () => {
    try {
      await axios.post("/comment/post", {
        content: reply,
        PostId: comment.PostId,
        PostCommentId: comment.id,
      });
    } catch (error) {
      console.log(`PostReplyComments Error ${error}`);
    }
  };

  return (
    <PostReplyInputWrapper>
      <PostReplyInput
        value={reply}
        onChange={(e) => {
          setReply(e.target.value);
        }}
      />
      <ReplyButtonWrapper>
        <ReplyCancelButton onClick={() => setReplyInputOpen(false)}>
          취소
        </ReplyCancelButton>
        <ReplyInputButton
          onClick={() => {
            handlePostReplyComment();
            setReply("");
            setReplyUpdate(!replyUpdate);
          }}
        >
          게시
        </ReplyInputButton>
      </ReplyButtonWrapper>
    </PostReplyInputWrapper>
  );
};

export default PostReplyCommentInputCp;
