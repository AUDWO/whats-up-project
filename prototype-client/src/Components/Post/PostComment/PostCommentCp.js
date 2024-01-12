import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

//Styled-Components
import {
  CommentWrapper2,
  CommentProfileWrapper,
  CommentProfileImg,
  CommentProfileInfo,
  CommentUserNicknameWrapper,
  CommentUserNickname,
  LikeButtonWrapper,
  CommentLikeFillIcon,
  CommentLikeIcon,
  CommentContent,
  MoreReplyButtonWrapper,
  MoreReplyButtonIcon,
  MoreReplyTitle,
} from "../../../StyledComponents/PostStyle/PostCommentCpSt";

//Component
import PostReplyComment from "../PostReplyComment/PostReplyComment";
import SpinnerCp from "../../Common/Spinner/SpinnerCp";
import PostCommentContactCp from "./PostCommentContactCp";
import PostReplyCommentInputCp from "../PostReplyCommentInput/PostReplyCommentInputCp";

//atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";

const PostCommentCp = ({ comment, myComment }) => {
  //댓글 좋아요 상태
  const [postCommentLikeCount, setPostCommentLikeCount] = useState(0);
  const [commentLikeCheck, setCommentLikeCheck] = useState(false);

  //대댓글 상태
  const replyInputOpen = useRecoilValue(
    ModalOpenAtom(`replyComment${comment.id}`)
  );
  const [ReplyCommentsOpen, setReplyCommentsOpen] = useState(false);

  //좋아요 버튼 함수
  const handleSubitCommentLike = async () => {
    try {
      await axios.post(`/comment/post/like/${comment.id}`);
    } catch (error) {
      console.error(error, "handleSubmitCommentLike - Error");
    }
  };
  //좋아요 버튼 취소 함수
  const handleSubmitCommentUnlike = async () => {
    try {
      await axios.post(`/comment/post/unlike/${comment.id}`);
    } catch (error) {
      console.error(error, "handleSubmitCommentUnlike - Error");
    }
  };

  //댓글 좋아요 정보를 불러오는 함수 (api 폴더에서 따로 관리 할 예정)
  const getPostCommentsInfo = async () => {
    try {
      const response = await axios.get(`
      /page/render-only-postcomment-likeinfo/${comment.id}
      `);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  //댓글의 좋아요 정보를 불러옴
  const commentLikeInfo = useQuery({
    queryKey: [`postCommentLikeInfo${comment.id}`],
    queryFn: getPostCommentsInfo,
  });

  //좋아요를 누르면 실행되는 함수
  const handleCommentLike = () => {
    setCommentLikeCheck(true);
    setPostCommentLikeCount((prev) => prev + 1);
    handleSubitCommentLike();
  };

  //좋아요 취소를 누르면 실행되는 함수
  const handleCommentUnlike = () => {
    setCommentLikeCheck(false);
    setPostCommentLikeCount((prev) => prev - 1);
    handleSubmitCommentUnlike();
  };

  useEffect(() => {
    if (commentLikeInfo.data) {
      setPostCommentLikeCount(
        commentLikeInfo.data.data.postCommentLikeCount.length
      );
      setCommentLikeCheck(commentLikeInfo.data.data.likeCheck);
    }
  }, [commentLikeInfo.data]);

  const getPostReplyComments = async () => {
    try {
      const response = await axios.get(
        `/page/render-post-replycomment/${comment.id}`
      );
      return response;
    } catch (error) {
      console.error(error, "getRostReplyComment - Error");
    }
  };

  //replyComments
  const { data: replyComments, isLoading } = useQuery({
    queryKey: [`postReplyComments-${comment.id}`],
    queryFn: getPostReplyComments,
  });

  if (isLoading) {
    return (
      <SpinnerWrapper>
        <SpinnerCp color="#f7dd07" size="30px" />
      </SpinnerWrapper>
    );
  }

  return (
    <CommentWrapper2>
      <CommentProfileWrapper>
        <CommentProfileImg src={comment.User.profileImg} />
        <CommentProfileInfo>
          <CommentUserNicknameWrapper>
            <CommentUserNickname>{comment.User.nickname}</CommentUserNickname>
            <LikeButtonWrapper>
              {commentLikeCheck ? (
                <CommentLikeFillIcon
                  onClick={() => {
                    handleCommentUnlike();
                  }}
                />
              ) : (
                <CommentLikeIcon
                  onClick={() => {
                    handleCommentLike();
                  }}
                />
              )}
            </LikeButtonWrapper>
          </CommentUserNicknameWrapper>
          <CommentContent>{comment.content}</CommentContent>
          <PostCommentContactCp
            myComment={myComment}
            comment={comment}
            postCommentLikeCount={postCommentLikeCount}
          />
          {replyInputOpen && <PostReplyCommentInputCp comment={comment} />}
          {replyComments?.data.length >= 1 && (
            <MoreReplyButtonWrapper
              onClick={() => setReplyCommentsOpen(!ReplyCommentsOpen)}
            >
              <MoreReplyButtonIcon moreReplyOpen={ReplyCommentsOpen} />
              <MoreReplyTitle>댓글</MoreReplyTitle>
            </MoreReplyButtonWrapper>
          )}
          {ReplyCommentsOpen && (
            <>
              {replyComments.data.map((replyComment) => (
                <PostReplyComment
                  replyComment={replyComment}
                  commentId={comment.id}
                />
              ))}
            </>
          )}
        </CommentProfileInfo>
      </CommentProfileWrapper>
    </CommentWrapper2>
  );
};

export default PostCommentCp;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
