import React from "react";

import {
  MoreComment,
  ProfileName,
  ProfileWrapper,
  MoreCommentProfile,
  CommentWrapper,
  CommentContact,
  CommentContent,
  CommentContactIcon,
} from "../../../../StyledComponents/CommonCpStyle/More/MoreComment/MoreCommentCpSt";

const ReplyCommentCp = ({ reply }) => {
  return (
    <MoreComment>
      <ProfileWrapper>
        <MoreCommentProfile></MoreCommentProfile>
      </ProfileWrapper>
      <CommentWrapper>
        <ProfileName>{reply.User.nickname}</ProfileName>
        <CommentContent>{reply.content}</CommentContent>
        <CommentContact>
          <CommentContactIcon />
        </CommentContact>
      </CommentWrapper>
    </MoreComment>
  );
};

export default ReplyCommentCp;
