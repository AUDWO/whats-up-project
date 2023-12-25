import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import axios from "axios";

import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { LuSmilePlus } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";

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

//Atom
import ModalOpenAtom from "../../../../store/ModalOpenAtom";

//Component
import ReplyCommentCp from "./MoreReplyCommentCp";
import CommentConfigModalCp from "../../Comment/CommentConfigModalCp";
import CustomUseMutation from "../../../../customHooks/CustomUseMutation";

const MoreCommentCp = ({ comment, moreType }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyCommentContent, setReplyCommentContent] = useState("");
  const [replyInputOpen, setReplyInputOpen] = useState(false);

  const [commentConfigModalOpen, setCommentConfigModalOpen] = useRecoilState(
    ModalOpenAtom(`${moreType}CommentConfigModal${comment.id}`)
  );

  //대댓글 api
  const createStoryComment = async () => {
    try {
      const response = await axios.post("/comment/story", {
        content: replyCommentContent,
        StoryCommentId: comment.id,
        StoryId: comment.StoryId,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const createDiaryComment = async () => {
    try {
      return await axios.post("/comment/diary", {
        content: replyCommentContent,
        DiaryCommentId: comment.id,
        DiaryId: comment.diaryId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fnDeterminedByMoreType = (() => {
    if (moreType === "story") return createStoryComment;
    if (moreType === "diary") return createDiaryComment;
  })();

  const { mutate: handleCommentCreate } = CustomUseMutation(
    fnDeterminedByMoreType,
    `${moreType}ReplyComments-${comment.id}`,
    () => {
      setReplyCommentContent("");
    }
  );

  //---------------------------------------------------

  const getReplyComments = async () => {
    try {
      const response = await axios.get(
        `/page/render-${moreType}-replycomments/${comment.id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  //replyComments
  const { data: replyComments, isLoading } = useQuery({
    queryKey: [`${moreType}ReplyComments-${comment.id}`],
    queryFn: getReplyComments,
  });

  const commentIdDeterminedByContentType = (() => {
    if (moreType === "story") return comment.StoryId;
    if (moreType === "diary") return comment.diaryId;
  })();

  if (isLoading) {
    return (
      <MoreComment>
        <ProfileWrapper>
          <MoreCommentProfile></MoreCommentProfile>
        </ProfileWrapper>
        <CommentWrapper></CommentWrapper>
      </MoreComment>
    );
  }

  const isReplyComment = (() => {
    if (replyComments?.data.length >= 1) return true;
    else return false;
  })();

  return (
    <MoreComment>
      <ProfileWrapper>
        <MoreCommentProfile src={comment.User.profileImg} />
      </ProfileWrapper>
      <CommentWrapper>
        <ProfileNameWrapper>
          <ProfileName>{comment.User.nickname}</ProfileName>
          <CommentConfigIcon
            onClick={() => {
              setTimeout(() => {
                setCommentConfigModalOpen(true);
              }, 0);
            }}
          />
          {commentConfigModalOpen && (
            <CommentConfigModalCp
              contentType={moreType}
              top={"0"}
              right={"0"}
              commentId={comment.id}
              commentType={"comment"}
              contentId={commentIdDeterminedByContentType}
            />
          )}
        </ProfileNameWrapper>
        <CommentContent>{comment.content}</CommentContent>
        <CommentContact>
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
              value={replyCommentContent}
              onChange={(e) => {
                setReplyCommentContent(e.target.value);
              }}
            />
            <ReplyButtonWrapper>
              <CommentReplyCancelButton
                onClick={() => {
                  setReplyCommentContent("");
                  setReplyInputOpen(false);
                }}
              >
                취소
              </CommentReplyCancelButton>
              <CommentReplyInputButton
                replyCheck={replyCommentContent}
                onClick={handleCommentCreate}
              >
                답글
              </CommentReplyInputButton>
            </ReplyButtonWrapper>
          </CommentReplyInputWrapper>
        )}
        <>
          {isReplyComment && (
            <CommentContactReplyShowWrapper
              onClick={() => {
                setReplyOpen(!replyOpen);
              }}
            >
              {replyOpen ? (
                <CommentReplyOpenIcon replyOpen={replyOpen} />
              ) : (
                <CommentReplyCloseIcon />
              )}
              <CommentContactReplyTitle>답글</CommentContactReplyTitle>
            </CommentContactReplyShowWrapper>
          )}
          {replyOpen && (
            <>
              {replyComments.data.map((reply) => (
                <ReplyCommentCp
                  reply={reply}
                  key={reply.id}
                  moreType={moreType}
                  commentId={comment.id}
                />
              ))}
            </>
          )}
        </>
      </CommentWrapper>
    </MoreComment>
  );
};

export default MoreCommentCp;

const MoreComment = styled.div`
  display: flex;
  width: 100%;
  min-height: 120px;
  height: auto;
  padding: 25px 0px 10px 15px;
  border-bottom: 0.5px solid black;
`;

const ProfileWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const MoreCommentProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  margin-right: 20px;
`;

const CommentWrapper = styled.div`
  width: 100%;
`;

const ProfileName = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-right: 6px;
`;

const CommentContact = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CommentContactIcon = styled(LuSmilePlus)`
  margin-right: 20px;
  font-size: 25px;
  cursor: pointer;
`;

const CommentContactReply = styled.div`
  cursor: pointer;
`;

const CommentContent = styled.div`
  height: auto;
  line-height: 1.5;
`;

const ProfileNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

//---------------------------

const CommentConfigIcon = styled(BsThreeDots)`
  font-size: 20px;
  color: gray;
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

//--

const CommentContactReplyShowWrapper = styled.div`
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
const CommentContactReplyTitle = styled.div`
  font-size: 16px;
  margin-left: 12px;
`;

const CommentReplyInputWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;

const CommentReplyInput = styled.input`
  width: 80%;
  height: 40px;
  border: none;
  font-size: 16px;
  border-bottom: 1px solid black;
  background-color: #f8f9fa;
  padding-left: 10px;
`;

const ReplyButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20%;
  height: 40px;
  border-bottom: 1px solid black;
`;
const CommentReplyInputButton = styled.div`
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

const CommentReplyCancelButton = styled.div`
  width: 50%;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #e8e8e8;
    border-radius: 20px;
  }
`;

const CommentReplyOpenIcon = styled(BiSolidDownArrow)``;

const CommentReplyCloseIcon = styled(BiSolidUpArrow)``;
