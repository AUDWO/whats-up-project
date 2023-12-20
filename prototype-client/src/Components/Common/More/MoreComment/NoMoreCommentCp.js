import React from "react";
import {
  MoreComment,
  ProfileWrapper,
  CommentWrapper,
  ProfileInfoWrapper,
  ProfileNameWrapper,
  ProfileName,
  OfficialBadgeIcon,
  CommentContent,
  WolfIcon,
} from "../../../../StyledComponents/CommonCpStyle/More/MoreComment/MoreCommentCpSt";
import { GiPunchBlast } from "react-icons/gi";
import styled from "styled-components";

const NoMoreCommentCp = () => {
  return (
    <MoreComment>
      <ProfileWrapper>
        <WolfIcon />
      </ProfileWrapper>
      <CommentWrapper>
        <ProfileInfoWrapper>
          <ProfileNameWrapper>
            <ProfileName>WHAT'S UP</ProfileName>
            <OfficialBadgeIcon />
          </ProfileNameWrapper>
        </ProfileInfoWrapper>
        <CommentContent>댓글을 남겨보세요!</CommentContent>
      </CommentWrapper>
    </MoreComment>
  );
};

export default NoMoreCommentCp;

export const MainIcon = styled(GiPunchBlast)`
  color: #f7dd07;
  font-size: 50px;
  background-color: #f8f9fa;
`;
