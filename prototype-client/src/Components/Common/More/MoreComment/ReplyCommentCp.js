import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { BsThreeDots } from "react-icons/bs";

//Styled-Components
import {
  ProfileName,
  ProfileWrapper,
  CommentContent,
} from "../../../../StyledComponents/CommonCpStyle/More/MoreComment/MoreCommentCpSt";

//Atom
import ModalOpenAtom from "../../../../store/ModalOpenAtom";

//Component
import CommentConfigModalCp from "../../Comment/CommentConfigModalCp";

const ReplyCommentCp = ({ commentId, reply, moreType }) => {
  const [commentConfigModalOpen, setCommentConfigModalOpen] = useRecoilState(
    ModalOpenAtom(`${moreType}CommentConfigModal${reply.id}`)
  );
  console.log(reply, "reply-reply-reply-reply-reply");

  return (
    <MoreComment>
      <ProfileWrapper>
        <MoreCommentProfileImg src={reply.User.profileImg} />
      </ProfileWrapper>
      <CommentWrapper>
        <ProfileNameWrapper>
          <ProfileName>{reply.User.nickname}</ProfileName>
          <StoryCommentConfigIcon
            onClick={() => {
              setTimeout(() => {
                setCommentConfigModalOpen(true);
              }, 0);
            }}
          />
          {commentConfigModalOpen && (
            <CommentConfigModalCp
              moreType={moreType}
              top={"0"}
              right={"0"}
              commentIdOfReplyComment={commentId}
              comment={reply}
              commentType={"replyComment"}
            />
          )}
        </ProfileNameWrapper>
        <CommentContent>{reply.content}</CommentContent>
      </CommentWrapper>
    </MoreComment>
  );
};

export default ReplyCommentCp;
const MoreComment = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  height: auto;
  padding: 15px 0px 10px 15px;
  border-top: 0.5px solid black;
`;

const StoryCommentConfigIcon = styled(BsThreeDots)`
  font-size: 20px;
  color: gray;
  &:hover {
    color: black;
  }
  cursor: pointer;
`;
const ProfileNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const CommentWrapper = styled.div`
  width: 100%;
  height: 60px;
`;

const MoreCommentProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  margin-right: 20px;
`;
