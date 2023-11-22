import styled from "styled-components";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CommentWrapper } from "../../MoreStoryStyle/MoreStoryCommentCpSt";

export const CommentConfigIcon = styled(BsThreeDots)`
  cursor: pointer;
`;

//---
export const CommentWrapper2 = styled(CommentWrapper)`
  margin-top: 10px;
`;

export const CommentLikeIcon = styled(AiOutlineHeart)``;

export const CommentLikeFillIcon = styled(AiFillHeart)`
  color: #f7dd07;
`;

export const CommentProfileWrapper = styled.div`
  display: flex;
  height: auto;
`;

export const CommentProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  margin-right: 15px;
`;

export const CommentProfileInfo = styled.div`
  width: 250px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const CommentUserNicknameWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CommentUserNickname = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
`;

export const CommentContent = styled.div`
  min-height: 20px;
  height: auto;
  margin-bottom: 10px;
  margin-top: 5px;
`;

export const LikeButtonWrapper = styled.div`
  display: flex;
  width: 20px;
`;

export const CommentContactWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
  position: relative;
`;

export const CommentLikeCount = styled.div`
  font-size: 13px;
  margin-right: 15px;
`;

export const CommentReplyButtom = styled.button`
  font-size: 13px;
`;
