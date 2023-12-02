import styled, { css } from "styled-components";

import { BiDownArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";

import { FaRegComment } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";
import Profile from "../../../Components/Profile";
import ProfileWrapper from "../ProfileStyle/ProfileWrapper";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { CommentModalWrapper } from "../../../PostCp";

let fontSize35 = css`
  font-size: 25px;
`;
let fontSize25 = css`
  font-size: 20px;
`;

let mainColor = css`
  color: #f7dd07;
`;

let marginB60 = css`
  margin-bottom: 60px;
`;

let marginT60 = css`
  margin-top: 60px;
`;

let marginT15 = css`
  margin-top: 15px;
`;
let marginT30 = css`
  margin-top: 30px;
`;

let marginB15 = css`
  margin-bottom: 15px;
`;

let marginB30 = css`
  margin-bottom: 30px;
`;
let marginB200 = css`
  margin-bottom: 200px;
`;

export const ProfileIcon = styled(Profile)`
  & ${ProfileWrapper} {
    flex-direction: column;
    ${marginT60};
  }
`;
export const CommentIcon = styled(FaRegComment)`
  margin-left: 15px;
  ${fontSize25};
  &:hover {
    color: #f7dd07;
  }
  cursor: pointer;
`;

export const NotCommentIcon = styled(FaRegComment)`
  margin-left: 15px;
  cursor: pointer;
  ${fontSize25};
  color: gray;
`;

export const DownArrowIcon = styled(BiDownArrow)`
  ${marginT30};
  ${marginB60}
  ${fontSize35};
  &:hover {
    ${mainColor};
  }
`;

export const UpArrowIcon = styled(BiUpArrow)`
  ${marginT60};
  ${marginB30}
  ${fontSize35};
  &:hover {
    ${mainColor};
  }
`;

export const MoreIcon = styled(IoReorderThreeSharp)`
  margin-left: 15px;
  ${fontSize35}
`;

export const LikeIcon = styled(AiOutlineHeart)`
  margin-left: 15px;
  ${fontSize35};
  cursor: pointer;
`;

export const LikeFillIcon = styled(AiFillHeart)`
  margin-left: 15px;
  ${fontSize35};
  color: #f7dd07;
  cursor: pointer;
`;
