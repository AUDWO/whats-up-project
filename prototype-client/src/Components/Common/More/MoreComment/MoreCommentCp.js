import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { LuSmilePlus } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";

import axios from "axios";
/*
import {
  MoreComment,
  ProfileWrapper,
  MoreCommentProfile,
  CommentWrapper,
  ProfileName,
  CommentContact,
  CommentContactIcon,
  CommentContactReply,
  CommentContent,
  ProfileNameWrapper,
} from "../../../StyledComponents/CommonCpStyle/MoreComment/MoreCommentCpSt";*/

import { useRecoilState } from "recoil";
import ModalOpenAtom from "../../../../store/ModalOpenAtom";
import ReplyCommentCp from "./ReplyCommentCp";
import CommentConfigModalCp from "../../Comment/CommentConfigModalCp";

const MoreCommentCp = ({ comment, type }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyUpdate, setReplyUpdate] = useState(false);
  const [replyInputOpen, setReplyInputOpen] = useState(false);

  const [commentConfigModalOpen, setCommentConfigModalOpen] = useRecoilState(
    ModalOpenAtom(`${type}CommentConfigModal${comment.id}`)
  );

  //대댓글 api
  const handlePostStoryReplyComment = async () => {
    try {
      await axios.post("/comment/story", {
        content: reply,
        StoryCommentId: comment.id,
        StoryId: comment.StoryId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostDiaryReplyComment = async () => {
    try {
      await axios.post("/comment/diary", {
        content: reply,
        DiaryCommentId: comment.id,
        DiaryId: comment.diaryId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //대댓글 불러오는 api
    const fetchReplyComment = async () => {
      try {
        const response = await axios.get(
          `/page/render-${type}-replycomments/${comment.id}`
        );

        setReplies([...response.data]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReplyComment();
  }, [replyUpdate]);

  return (
    <MoreComment>
      <ProfileWrapper>
        <MoreCommentProfile></MoreCommentProfile>
      </ProfileWrapper>
      <CommentWrapper>
        <ProfileNameWrapper>
          <ProfileName>{comment.User.nickname}</ProfileName>
          <StoryCommentConfigIcon
            onClick={() => {
              setTimeout(() => {
                setCommentConfigModalOpen(true);
              }, 0);
            }}
          />
          {commentConfigModalOpen && (
            <CommentConfigModalCp
              type={type}
              top={"0"}
              right={"0"}
              comment={comment}
            />
            /*
            <CommentConfigModalCp
              type={type}
              top={"0"}
              right={"0"}
              comment={comment}
            />*/
          )}
        </ProfileNameWrapper>
        <CommentContent>{comment.content}</CommentContent>
        <CommentContact>
          <CommentContactIcon />
          <CommentContactReply
            onClick={() => {
              setReplyInputOpen(!replyInputOpen);
            }}
          >
            답글 달기
          </CommentContactReply>
        </CommentContact>
        {replyInputOpen && (
          <CommentReplyInputWrapper>
            <CommentReplyInput
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
            />
            <ReplyButtonWrapper>
              <CommentReplyCancelButton
                onClick={() => {
                  setReply("");
                  setReplyInputOpen(false);
                }}
              >
                취소
              </CommentReplyCancelButton>
              <CommentReplyInputButton
                replyCheck={reply}
                onClick={() => {
                  if (type === "diary") {
                    handlePostDiaryReplyComment();
                  }
                  if (type === "story") {
                    handlePostStoryReplyComment();
                  }
                  setReplyUpdate(!replyUpdate);
                  setReply("");
                }}
              >
                답글
              </CommentReplyInputButton>
            </ReplyButtonWrapper>
          </CommentReplyInputWrapper>
        )}

        <>
          {replies.length > 0 && (
            <CommentContactReplyShowWrapper
              onClick={() => {
                setReplyOpen(!replyOpen);
              }}
            >
              <CommentReplyOpenIcon replyOpen={replyOpen} />
              <CommentContactReplyTitle>답글</CommentContactReplyTitle>
            </CommentContactReplyShowWrapper>
          )}
          {replyOpen && (
            <>
              {replies.map((reply) => (
                <ReplyCommentCp reply={reply} key={reply.id} />
              ))}
            </>
          )}
        </>
      </CommentWrapper>
    </MoreComment>
  );
};

export default MoreCommentCp;

export const MoreComment = styled.div`
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

export const MoreCommentProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  margin-right: 20px;
`;

export const CommentWrapper = styled.div`
  width: 100%;
`;

export const ProfileName = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-right: 6px;
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

export const CommentContent = styled.div`
  height: auto;
  line-height: 1.5;
`;

export const ProfileNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

//---------------------------

export const StoryCommentConfigIcon = styled(BsThreeDots)`
  font-size: 20px;
  color: gray;
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

//--

export const CommentContactReplyShowWrapper = styled.div`
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1866d6;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    border-radius: 15px;
    background-color: #c5d5f5;
  }
`;
export const CommentContactReplyTitle = styled.div`
  font-size: 16px;
  margin-left: 12px;
`;

export const CommentReplyInputWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;

export const CommentReplyInput = styled.input`
  width: 80%;
  height: 40px;
  border: none;
  font-size: 16px;
  border-bottom: 1px solid black;
  background-color: #f8f9fa;
  padding-left: 10px;
`;

export const ReplyButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20%;
  height: 40px;
  border-bottom: 1px solid black;
`;

export const CommentReplyInputButton = styled.div`
  line-height: 40px;
  width: 50%;
  text-align: center;
  color:${(props) => (props.replyCheck ? "black" : "gray")}
  &:hover {
    color: black;
    background-color: #e8e8e8;
    border-radius: 20px;
  }
  cursor:pointer;
`;

export const CommentReplyCancelButton = styled.div`
  width: 50%;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #e8e8e8;
    border-radius: 20px;
  }
`;

export const CommentReplyOpenIcon = styled(BiSolidDownArrow)`
  transform: ${(props) =>
    props.replyOpen ? "  rotate(180deg)" : " rotate(0deg)"};

  transition: transform 0.5s;
`;

export const CommentReplyCloseIcon = styled(BiSolidUpArrow)``;
