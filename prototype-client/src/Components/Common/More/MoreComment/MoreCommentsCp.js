import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

//Styled-components
import {
  MoreCommentContentsWrapper,
  MoreCommentWrapper,
  CommentSpace,
} from "../../../../StyledComponents/CommonCpStyle/More/MoreComment/MoreCommentCpSt";

//Components
import MoreCommentCp from "./MoreCommentCp";
import MoreCommentInputCp from "./MoreCommentInputCp";
import NoMoreCommentCp from "./NoMoreCommentCp";

const MoreCommentsCp = ({ storyId, diaryId, moreType }) => {
  const fetchStoryCommentsData = async () => {
    try {
      const response = await axios.get(
        `/page/render-story-comments/${storyId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDiaryCommentsData = async () => {
    try {
      const response = await axios.get(
        `/page/render-diary-comments/${diaryId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: moreStoryComments, isLoading: storyCommentsIsLoading } =
    useQuery({
      queryKey: [`storyComments-${storyId}`],
      queryFn: fetchStoryCommentsData,
      enabled: !diaryId,
    });
  const { data: moreDiaryComments, isLoading: diaryCommentsIsLoading } =
    useQuery({
      queryKey: [`diaryComments-${diaryId}`],
      queryFn: fetchDiaryCommentsData,
      enabled: !storyId,
    });

  /* 이렇게 한개로 합치기
  const getComments = async () => {
    try {
      const response = await axios.get(
        `/page/render-${moreType}-comments/${"contentId"}`
      );
      return response;
    } catch (error) {
      console.error(error, "getComments - Error");
    }
  };
  const { data } = useQuery({
    queryKey: [`${moreType}Comments-${"contentId"}`],
    queryFn: getComments,
  });*/

  if (storyCommentsIsLoading || diaryCommentsIsLoading) {
    return <div>안녕</div>;
  }

  if ((diaryId ? moreDiaryComments.data : moreStoryComments.data).length >= 1) {
    return (
      <MoreCommentWrapper>
        <MoreCommentContentsWrapper>
          <MoreCommentInputCp storyId={storyId} diaryId={diaryId} />
          {!(diaryId ? moreDiaryComments : moreStoryComments) && (
            <NoMoreCommentCp />
          )}
          {(diaryId ? moreDiaryComments.data : moreStoryComments.data).map(
            (comment) => (
              <MoreCommentCp
                comment={comment}
                key={comment.id}
                moreType={moreType}
              />
            )
          )}
          <CommentSpace></CommentSpace>
        </MoreCommentContentsWrapper>
      </MoreCommentWrapper>
    );
  }

  return (
    <MoreCommentWrapper>
      <MoreCommentContentsWrapper>
        <MoreCommentInputCp diaryId={diaryId} storyId={storyId} />
        <NoMoreCommentCp />
        <CommentSpace></CommentSpace>
      </MoreCommentContentsWrapper>
    </MoreCommentWrapper>
  );
};

export default MoreCommentsCp;
