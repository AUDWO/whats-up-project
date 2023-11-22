import styled from "styled-components";
import { CommentWrapper } from "../MoreStoryStyle/MoreStoryCommentCpSt";

//icons
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
//취소
import { AiOutlineCloseCircle } from "react-icons/ai";
//휴지통
import { RiDeleteBinLine } from "react-icons/ri";

export const MoreReplyButtonIcon = styled(BiSolidDownArrow)`
  margin-right: 5px;
`;
export const MoreReplyButtonWrapper = styled.div`
  display: flex;
  ${MoreReplyButtonIcon} {
    transform: ${(props) =>
      props.moreReplyOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
  color: #236bd8;

  margin-top: 7px;
  margin-bottom: 7px;
`;

export const MoreReplyTitle = styled.div``;

export const CommentWrapper2 = styled(CommentWrapper)`
  margin: 10px;
  width: 360px;
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
  width: 300px;
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
  min-height: 30px;
  height: auto;
  margin-bottom: 10px;
`;

export const LikeButtonWrapper = styled.div`
  display: flex;
  width: 20px;
`;

export const CommentContactWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  position: relative;
`;

export const CommentContactDiv = styled.div`
  display: flex;
`;

export const CommentLikeCount = styled.div`
  font-size: 13px;
  margin-right: 15px;
`;

export const CommentConfigIcon = styled(BsThreeDots)`
  cursor: pointer;
`;

export const CommentConfigCloseIcon = styled(AiOutlineCloseCircle)`
  color: red;
  margin-right: 3px;
`;

export const CommentDeleteIcon = styled(RiDeleteBinLine)`
  margin-right: 3px;
`;

export const CommentConfigModal = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 100px;
  height: 90px;
  border-radius: 10px;
  border: none;
  background-color: white;
`;

export const CommentConfigModalOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  height: 30px;
  cursor: pointer;
`;

export const CommentReplyButtom = styled.button`
  font-size: 13px;
`;
