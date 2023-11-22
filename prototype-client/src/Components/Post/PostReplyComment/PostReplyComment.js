import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

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
  CommentContactWrapper,
  CommentLikeCount,
  CommentConfigIcon,
} from "../../../StyledComponents/PostStyle/PostReplyComment/PostReplyCommentCpSt";

//component
import CommentConfigModalCp from "../../Common/Comment/CommentConfigModalCp";

//atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import stateUpdateAtom from "../../../store/stateUpdateAtom";
import userInfoAtom from "../../../store/userState/userAtom";

const PostReplyComment = ({ comment }) => {
  const userInfo = useRecoilValue(userInfoAtom);

  const [postReplyCommentConfigModalOpen, setPostReplyCommentConfigModalOpen] =
    useRecoilState(ModalOpenAtom(`postCommentConfigModal${comment.id}`));

  const [postReplyCommentInfoUpdate, setPostReplyCommentInfoUpdate] =
    useRecoilState(stateUpdateAtom(`replyComment${comment.id}`));

  const [postReplyCommentLikeInfo, setPostReplyCommentLikeInfo] = useState({});

  //댓글 좋아요를 눌렀는지 확인해주는 함수
  const handleLikeCheck = () => {
    let check = false;
    postReplyCommentLikeInfo.postCommentLikeCount.forEach((info) => {
      if (info.id === userInfo.id) {
        check = true;
      }
    });
    return check;
  };

  useEffect(() => {
    const fetchPostReplyCommentLikeInfo = async () => {
      try {
        //postCommentLikeInfo Update
        const postCommentLikeInfoResponse = await axios.get(`
        /page/render-only-postcomment-likeinfo/${comment.id}
        `);
        setPostReplyCommentLikeInfo({ ...postCommentLikeInfoResponse.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostReplyCommentLikeInfo();
  }, [postReplyCommentInfoUpdate]);

  const handleLikePost = async () => {
    try {
      const response = await axios.post(`/comment/post/like/${comment.id}`);
      setPostReplyCommentInfoUpdate(!postReplyCommentInfoUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnLikePost = async () => {
    try {
      const response = await axios.post(`/comment/post/unlike/${comment.id}`);
      setPostReplyCommentInfoUpdate(!postReplyCommentInfoUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  if (Object.keys(postReplyCommentLikeInfo).length >= 1) {
    return (
      <CommentWrapper2 index={1}>
        <CommentProfileWrapper>
          <CommentProfileImg />
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
            <CommentContactWrapper>
              <CommentLikeCount>
                좋아요 {postReplyCommentLikeInfo.postCommentLikeCount.length}
              </CommentLikeCount>
              <>
                <CommentConfigIcon
                  onClick={() => {
                    setTimeout(() => {
                      setPostReplyCommentConfigModalOpen(true);
                    }, 0);
                  }}
                />
                {postReplyCommentConfigModalOpen && (
                  <CommentConfigModalCp
                    type={"post"}
                    comment={comment}
                    commentId={comment.id}
                    bottom={"-10px"}
                    right={"-10px"}
                  />
                )}
              </>
            </CommentContactWrapper>
          </CommentProfileInfo>
        </CommentProfileWrapper>
      </CommentWrapper2>
    );
  }
};

export default PostReplyComment;
