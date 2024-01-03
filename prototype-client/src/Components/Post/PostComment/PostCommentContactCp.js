import React from "react";
import { useRecoilState } from "recoil";

//Styled-Components
import {
  CommentContactWrapper,
  CommentContactDiv,
  CommentLikeCount,
  CommentReplyButtom,
  CommentConfigIcon,
} from "../../../StyledComponents/PostStyle/PostCommentCpSt";

//Component
import CommentConfigModalCp from "../../Common/Comment/CommentConfigModalCp";

//Atom
import ModalOpenAtom from "../../../store/ModalOpenAtom";

const PostCommentContactCp = ({ postCommentLikeCount, myComment, comment }) => {
  const [postCommentConfigModalOpen, setPostCommentConfigModalOpen] =
    useRecoilState(ModalOpenAtom(`postCommentConfigModal${comment.id}`));

  const [replyInputOpen, setReplyInputOpen] = useRecoilState(
    ModalOpenAtom(`replyComment${comment.id}`)
  );

  return (
    <CommentContactWrapper>
      <CommentContactDiv>
        <CommentLikeCount>좋아요 {postCommentLikeCount}</CommentLikeCount>
        <CommentReplyButtom onClick={() => setReplyInputOpen(!replyInputOpen)}>
          답글 달기
        </CommentReplyButtom>
      </CommentContactDiv>

      {myComment && (
        <>
          <CommentConfigIcon
            onClick={(e) => {
              e.stopPropagation();
              setPostCommentConfigModalOpen(true);
            }}
          />
          {postCommentConfigModalOpen && (
            <CommentConfigModalCp
              contentType={"post"}
              commentId={comment.id}
              commentType={"comment"}
              contentId={comment.PostId}
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
