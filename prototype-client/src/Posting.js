import React from "react";

//Styled-Components
import {
  PostWrapper,
  PostDivWrapper,
} from "./StyledComponents/PostStyle/PostCpStyle";

//Components
import PostInfoCp from "./Components/Post/PostInfoCp";
import PostContentCp from "./Components/Post/PostContentCp";
import CommentModalCp from "./Components/Post/PostComment/PostCommentsCp";

const PostCp = ({ post }) => {
  const postContent = {
    url: post.img,
    title: post.title,
    content: post.content,
    contentControl: post.contentControl,
    id: post.id,
  };

  const postInfo = {
    id: post.id,
    likeCountControl: post.likeCountControl,
    commentControl: post.commentControl,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    likeCheck: post.likeCheck,
  };
  console.log("post.img");
  console.log(post.img);
  console.log("post.img");

  return (
    <PostDivWrapper>
      <PostWrapper>
        <PostContentCp postContent={postContent} userId={post.UserId} />
        <CommentModalCp postId={post.id} />
        <PostInfoCp postInfo={postInfo} />
      </PostWrapper>
    </PostDivWrapper>
  );
};

export default PostCp;
