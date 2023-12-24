import { useRecoilValue } from "recoil";
import { UserInfoProvider } from "../../contextApi/UserInfoProvider";
import styled from "styled-components";

//Styled-Components
import {
  PostWrapper,
  PostDivWrapper,
} from "../../StyledComponents/PostStyle/PostCpStyle";

//Components
import PostInfoCp from "./PostInfoCp";
import PostContentCp from "./PostContentCp";
import CommentModalCp from "./PostComment/PostCommentsCp";

//Atom
import toggleValueAtom from "../../store/ToggleValueAtom";

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
    likeControl: post.likeControl,
    commentControl: post.commentControl,
  };

  const isImgLoaded = useRecoilValue(toggleValueAtom(`isImgLoaded${post.id}`));

  console.log(post, "post - post - post - post - post");

  return (
    <PostDivWrapper>
      <PostWrapper>
        <UserInfoProvider>
          <PostContentCp postContent={postContent} userId={post.UserId} />
          {isImgLoaded && <CommentModalCp postId={post.id} />}
          {isImgLoaded && <PostInfoCp postInfo={postInfo} />}
        </UserInfoProvider>
      </PostWrapper>
    </PostDivWrapper>
  );
};

export default PostCp;

const P = styled.div`
  background-color: blue;
  width: 30px;
  height: 50px;
`;
