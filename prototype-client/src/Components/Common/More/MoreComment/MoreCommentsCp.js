import React, { useEffect, useState } from "react";

import {
  MoreCommentContentsWrapper,
  MoreCommentWrapper,
  MoreCommentTitle,
  MoreCommnetInputWrapper,
  MoreCommentInputIcon,
  MoreCommentInput,
  MoreComment,
  ProfileWrapper,
  WolfIcon,
  CommentWrapper,
  ProfileInfoWrapper,
  ProfileName,
  OfficialBadgeIcon,
  CommentContent,
  CommentContact,
  CommentContactIcon,
  CommentContactReply,
  CommentSpace,
  CommentPostButton,
  ProfileNameWrapper,
} from "../../../../StyledComponents/CommonCpStyle/More/MoreComment/MoreCommentCpSt";

import axios from "axios";
import { useRecoilState } from "recoil";
import stateUpdateAtom from "../../../../store/stateUpdateAtom";
import MoreCommentCp from "./MoreCommentCp";
import { GiPunchBlast } from "react-icons/gi";
import styled from "styled-components";

const MoreCommentsCp = ({ storyId, diaryId }) => {
  const [content, setContent] = useState("");

  const [commentUpdate, setCommentUpdate] = useRecoilState(
    stateUpdateAtom(`moreCommentUpdate`)
  );

  const [type, setType] = useState("");

  const [comments, setComments] = useState([]);

  const handlePostStoryComment = async () => {
    await axios.post("/comment/story", {
      content: content,
      StoryId: storyId,
    });
  };

  const handlePostDiaryComment = async () => {
    await axios.post("/comment/diary", {
      content: content,
      DiaryId: diaryId,
    });
  };

  useEffect(() => {
    //storyComment
    const fetchStoryCommentsData = async () => {
      try {
        const response = await axios.get(
          `/page/render-story-comments/${storyId}`
        );
        setComments([...response.data]);
      } catch (error) {
        console.error(error);
      }
    };
    if (storyId) {
      fetchStoryCommentsData();
      setType("story");
    }

    //diaryComment
    const fetchDiaryCommentsData = async () => {
      try {
        const response = await axios.get(
          `/page/render-diary-comments/${diaryId}`
        );
        setComments([...response.data]);
      } catch (error) {
        console.error(error);
      }
    };

    if (diaryId) {
      fetchDiaryCommentsData();
      setType("diary");
    }
  }, [commentUpdate]);

  if (comments.length >= 1) {
    return (
      <MoreCommentWrapper>
        <MoreCommentContentsWrapper>
          <MoreCommentTitle>댓글</MoreCommentTitle>
          <MoreCommnetInputWrapper>
            <MoreCommentInputIcon />
            <MoreCommentInput
              placeholder="댓글을 입력하세요."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <CommentPostButton
              comment={content}
              onClick={() => {
                if (diaryId) {
                  handlePostDiaryComment();
                }
                if (storyId) {
                  handlePostStoryComment();
                }
                setCommentUpdate(!commentUpdate);
                setContent("");
              }}
            >
              게시
            </CommentPostButton>
          </MoreCommnetInputWrapper>
          {!comments && (
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
          )}

          {comments.map((comment) => (
            <MoreCommentCp comment={comment} key={comment.id} type={type} />
          ))}

          <CommentSpace></CommentSpace>
        </MoreCommentContentsWrapper>
      </MoreCommentWrapper>
    );
  }

  return (
    <MoreCommentWrapper>
      <MoreCommentContentsWrapper>
        <MoreCommentTitle>댓글</MoreCommentTitle>
        <MoreCommnetInputWrapper>
          <MoreCommentInputIcon />
          <MoreCommentInput
            placeholder="댓글을 입력하세요."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <CommentPostButton
            comment={content}
            onClick={() => {
              if (diaryId) {
                handlePostDiaryComment();
              }
              if (storyId) {
                handlePostStoryComment();
              }
              setContent("");
              setCommentUpdate(!commentUpdate);
            }}
          >
            게시
          </CommentPostButton>
        </MoreCommnetInputWrapper>

        <MoreComment>
          <ProfileWrapper>
            <MainIcon />
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

        <CommentSpace></CommentSpace>
      </MoreCommentContentsWrapper>
    </MoreCommentWrapper>
  );
};

export default MoreCommentsCp;

export const MainIcon = styled(GiPunchBlast)`
  color: #f7dd07;
  font-size: 50px;
  background-color: #f8f9fa;
`;
