import { useRecoilValue } from "recoil";
import { UserInfoProvider } from "../../contextApi/UserInfoProvider";

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
  const postContentInfo = {
    url: post.img,
    title: post.title,
    content: post.content,
    contentControl: post.contentControl,
    id: post.id,
    userInfo: post.User,
  };

  const postInfo = {
    id: post.id,
    likeControl: post.likeControl,
    commentControl: post.commentControl,
  };

  const isImgLoaded = useRecoilValue(toggleValueAtom(`isImgLoaded${post.id}`));

  return (
    <PostDivWrapper>
      <PostWrapper>
        <UserInfoProvider>
          <PostContentCp
            postContentInfo={postContentInfo}
            userId={post.UserId}
          />
          {isImgLoaded && <CommentModalCp postId={post.id} />}
          {isImgLoaded && <PostInfoCp postInfo={postInfo} />}
        </UserInfoProvider>
      </PostWrapper>
    </PostDivWrapper>
  );
};

export default PostCp;
