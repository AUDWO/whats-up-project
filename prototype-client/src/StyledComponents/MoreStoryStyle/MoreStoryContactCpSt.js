import styled from "styled-components";

import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { BiSmile } from "react-icons/bi";
import { FaRegGrinSquintTears } from "react-icons/fa";

const fontSize = `25px`;

export const SmileIcon = styled(BiSmile)`
  font-size: ${fontSize};
  color: #f7dd07;
`;
export const SadIcon = styled(FaRegGrinSquintTears)`
  font-size: ${fontSize};
  font-size: 20px;
  color: #a64eff;
`;
export const HearIcon = styled(AiOutlineHeart)`
  font-size: ${fontSize};
  color: #ed203d;
`;
export const GoodIcon = styled(AiOutlineLike)`
  font-size: ${fontSize};
  color: #3182f6;
`;

export const GoodFillIcon = styled(AiFillLike)`
  font-size: ${fontSize};
  color: #3182f6;
`;

export const MoreStoryContact = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
`;

export const StoryContactIconCountNumber = styled.div``;

const backColor = {
  "#3182f6": "like",
  "#ed203d": "heart",
  "#f7dd07": "smile",
  "#a64eff": "sad",
};

export const StoryContactIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 70px;
  height: 35px;
  border-radius: 7px;
  background-color: ${(props) =>
    props.nextClick === backColor[props.backC] ? props.backC : "#f8f9fa"};
  margin-right: 18px;
  cursor: pointer;
  ${SadIcon} {
    color: ${(props) =>
      props.nextClick === backColor[props.backC] ? "white" : props.backC};
  }
  ${SmileIcon} {
    color: ${(props) =>
      props.nextClick === backColor[props.backC] ? "white" : props.backC};
  }
  ${HearIcon} {
    color: ${(props) =>
      props.nextClick === backColor[props.backC] ? "white" : props.backC};
  }
  ${GoodIcon} {
    color: ${(props) =>
      props.nextClick === backColor[props.backC] ? "white" : props.backC};
  }

  ${StoryContactIconCountNumber} {
    color: ${(props) =>
      props.nextClick === backColor[props.backC] ? "white" : "black"};
  }
  &:hover {
    background-color: ${(props) => props.backC};
    ${StoryContactIconCountNumber} {
      color: white;
    }
    ${SmileIcon} {
      color: white;
    }
    ${SadIcon} {
      color: white;
    }
    ${HearIcon} {
      color: white;
    }
    ${GoodIcon} {
      color: white;
    }
  }
`;
