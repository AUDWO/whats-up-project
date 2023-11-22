import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

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

//atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import stateUpdateAtom from "../../../store/stateUpdateAtom";
import userInfoAtom from "../../../store/userState/userAtom";
import PostCommentContactCp from "./PostCommentContactCp";
import PostReplyCommentInputCp from "../PostReplyComment/PostReplyCommentInputCp";

const PostCommentCp = ({ comment, myComment }) => {
  const userInfo = useRecoilValue(userInfoAtom);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  const replyInputOpen = useRecoilValue(
    ModalOpenAtom(`replyComment${comment.id}`)
  );

  const [moreReplyOpen, setMoreReplyOpen] = useState(false);

  //댓글에 좋아요를 누른 사람의 명단을 담는 객체
  const [postCommentLikeInfo, setPostCommentLikeInfo] = useState({});

  const replyUpdate = useRecoilValue(stateUpdateAtom("postReply"));

  //postCommentConfigModal에서 댓글 삭제 시 댓글 업데이트
  const postCommentUpdate = useRecoilValue(stateUpdateAtom("postComment"));

  //좋아요를 누르거나 취소 했을때 댓글 좋아요 정보를 업데이트 해주는 함수
  const [postCommentInfoUpdate, setPostCommentInfoUpdate] = useRecoilState(
    stateUpdateAtom(`comment${comment.id}`)
  );

  const handlePostReplyComment = async () => {
    try {
      await axios.post("/comment/post", {
        content: reply,
        PostId: comment.PostId,
        PostCommentId: comment.id,
      });
    } catch (error) {
      console.log(`PostReplyComments Error ${error}`);
    }
  };

  //댓글 좋아요를 눌렀는지 확인해주는 함수
  const handleLikeCheck = () => {
    let check = false;
    postCommentLikeInfo.postCommentLikeCount.forEach((info) => {
      if (info.id === userInfo.id) {
        check = true;
      }
    });
    return check;
  };

  //좋아요 버튼 함수
  const handleLikePost = async () => {
    try {
      const response = await axios.post(`/comment/post/like/${comment.id}`);
      setPostCommentInfoUpdate(!postCommentInfoUpdate);
    } catch (error) {
      console.error(error);
    }
  };
  //좋아요 버튼 취소 함수
  const handleUnLikePost = async () => {
    try {
      const response = await axios.post(`/comment/post/unlike/${comment.id}`);
      setPostCommentInfoUpdate(!postCommentInfoUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchReplyComments = async () => {
      try {
        const response = await axios.get(
          `/page/render-post-replycomment/${comment.id}`
        );
        setReplies(response.data);
      } catch (error) {}
    };

    fetchReplyComments();
  }, [replyUpdate, postCommentUpdate]);

  useEffect(() => {
    //댓글 좋아요 누르면 댓글 정보 업데이트 시켜주는 함수
    const fetchPostInfo = async () => {
      try {
        const postCommentLikeInfoResponse = await axios.get(`
        /page/render-only-postcomment-likeinfo/${comment.id}
        `);
        setPostCommentLikeInfo({ ...postCommentLikeInfoResponse.data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostInfo();
  }, [postCommentInfoUpdate]);

  //postCommentUpdate
  if (Object.keys(postCommentLikeInfo).length >= 1) {
    return (
      <CommentWrapper2>
        <CommentProfileWrapper>
          <CommentProfileImg src={comment.User.profileImg} />
          <CommentProfileInfo>
            <CommentUserNicknameWrapper>
              <CommentUserNickname>{comment.User.nickname}</CommentUserNickname>
              <LikeButtonWrapper>
                {handleLikeCheck() ? (
                  <CommentLikeFillIcon
                    onClick={() => {
                      handleUnLikePost();
                    }}
                  />
                ) : (
                  <CommentLikeIcon
                    onClick={() => {
                      handleLikePost();
                    }}
                  />
                )}
              </LikeButtonWrapper>
            </CommentUserNicknameWrapper>
            <CommentContent>{comment.content}</CommentContent>
            <PostCommentContactCp
              myComment={myComment}
              comment={comment}
              postCommentLikeInfo={postCommentLikeInfo}
            />
            {replyInputOpen && <PostReplyCommentInputCp comment={comment} />}
            {replies.length > 0 && (
              <MoreReplyButtonWrapper
                moreReplyOpen={moreReplyOpen}
                onClick={() => setMoreReplyOpen(!moreReplyOpen)}
              >
                <MoreReplyButtonIcon />
                <MoreReplyTitle>댓글</MoreReplyTitle>
              </MoreReplyButtonWrapper>
            )}
            {moreReplyOpen && (
              <>
                {replies.map((infoState) => (
                  <PostReplyComment comment={infoState} />
                ))}
              </>
            )}
          </CommentProfileInfo>
        </CommentProfileWrapper>
      </CommentWrapper2>
    );
  }
};

export default PostCommentCp;
