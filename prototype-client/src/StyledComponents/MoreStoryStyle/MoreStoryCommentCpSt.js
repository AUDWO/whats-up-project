import styled from "styled-components";

import { LuSmilePlus } from "react-icons/lu";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { GiWolfHowl } from "react-icons/gi";
import { BiPencil } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
export const MoreStoryCommentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f8f9fa;
`;

export const MoreStoryCommentContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: auto;
  margin-top: 50px;
`;

export const MoreStoryCommentTitle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  border: none;
  margin-bottom: 20px;
`;
export const MoreStoryCommnetInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 55px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
  background-color: #e8e8e8;
`;

export const MoreStoryCommentInputIcon = styled(BiPencil)`
  font-size: 25px;
  margin-right: 20px;
`;
export const MoreStoryCommentInput = styled.textarea`
  width: 600px;
  height: 30px;
  font-size: 20px;
  vertical-align: center;
  outline: none;
  border: none;
  resize: none;
  border-radius: 8px;
  background-color: #e8e8e8;
`;

export const StoryCommentPostButton = styled.div`
  font-size: 15px;
  color: ${(props) => (props.comment ? "black" : "#c7c7c8")};
  cursor: pointer;
`;

export const MoreStoryComment = styled.div`
  display: flex;
  width: 100%;
  min-height: 120px;
  height: auto;
  padding: 25px 0px 10px 15px;
  border-bottom: 0.5px solid black;
`;

export const ProfileWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
export const MoreStoryCommentProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  margin-right: 20px;
`;

export const CommentWrapper = styled.div`
  width: 100%;
`;

export const ProfileInfoWrapper = styled.div`
  display: flex;
`;

export const ProfileNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const ProfileName = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-right: 6px;
`;

export const CommentMoreIcon = styled(PiDotsThreeVerticalBold)`
  font-size: 30px;
  color: gray;
  &:hover {
    color: black;
  }
  cursor: pointer;
`;
export const CommentContent = styled.div`
  height: auto;
  line-height: 1.5;
`;

export const CommentContact = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const CommentContactIcon = styled(LuSmilePlus)`
  margin-right: 20px;
  font-size: 25px;
  cursor: pointer;
`;

export const CommentContactReply = styled.div`
  cursor: pointer;
`;

export const CommentSpace = styled.div`
  width: 100%;
  height: 100px;
`;

export const OfficialBadgeIcon = styled(HiMiniCheckBadge)`
  color: #f7dd07;
`;

export const WolfIcon = styled(GiWolfHowl)`
  font-size: 46px;
  color: #f7dd07;
  border-radius: 50%;
  border: 1px solid white;
  background-color: black;
`;
