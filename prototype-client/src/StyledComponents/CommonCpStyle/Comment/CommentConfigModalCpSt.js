import styled from "styled-components";
//취소
import { AiOutlineCloseCircle } from "react-icons/ai";

//수정
import { AiOutlineEdit } from "react-icons/ai";

//휴지통

import { RiDeleteBinLine } from "react-icons/ri";

export const CommentConfigCloseIcon = styled(AiOutlineCloseCircle)`
  color: red;
  margin-right: 3px;
`;

export const CommentDeleteIcon = styled(RiDeleteBinLine)`
  margin-right: 3px;
`;

export const CommentEditIcon = styled(AiOutlineEdit)`
  margin-right: 3px;
`;

export const CommentConfigModal = styled.div`
  position: absolute;
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  top: ${(props) => props.top};
  width: 100px;
  height: 60px;
  border-radius: 10px;
  border: none;
  background-color: white;
`;

export const CommentConfigModalOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  height: 30px;
  cursor: pointer;
`;
