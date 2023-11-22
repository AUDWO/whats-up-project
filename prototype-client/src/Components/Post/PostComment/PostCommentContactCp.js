import React from "react";
import {
  CommentContactWrapper,
  CommentContactDiv,
  CommentLikeCount,
  CommentReplyButtom,
  CommentConfigIcon,
} from "../../../StyledComponents/PostStyle/PostCommentCpSt";

import CommentConfigModalCp from "../../Common/Comment/CommentConfigModalCp";
import { useRecoilState } from "recoil";
import ModalOpenAtom from "../../../store/ModalOpenAtom";

const PostCommentContactCp = ({ postCommentLikeInfo, myComment, comment }) => {
  const [postCommentConfigModalOpen, setPostCommentConfigModalOpen] =
    useRecoilState(ModalOpenAtom(`postCommentConfigModal${comment.id}`));

  const [replyInputOpen, setReplyInputOpen] = useRecoilState(
    ModalOpenAtom(`replyComment${comment.id}`)
  );
  return (
    <CommentContactWrapper>
      <CommentContactDiv>
        <CommentLikeCount>
          좋아요 {postCommentLikeInfo.postCommentLikeCount.length}
        </CommentLikeCount>
        <CommentReplyButtom onClick={() => setReplyInputOpen(!replyInputOpen)}>
          답글 달기
        </CommentReplyButtom>
      </CommentContactDiv>

      {myComment && (
        <>
          <CommentConfigIcon
            onClick={() => {
              setTimeout(() => {
                setPostCommentConfigModalOpen(true);
              }, 0);
            }}
          />
          {postCommentConfigModalOpen && (
            <CommentConfigModalCp
              type={"post"}
              comment={comment}
              commentId={comment.id}
              bottom={"-10px"}
              right={"-10px"}
            />
          )}
        </>
      )}
    </CommentContactWrapper>
  );
};

export default PostCommentContactCp;
