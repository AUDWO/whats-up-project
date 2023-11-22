import styled from "styled-components";

export const PostReplyInputWrapper = styled.div`
  border-bottom: 1px solid black;
  display: flex;
`;

export const PostReplyInput = styled.input`
  width: 80%;
  border: none;
  background-color: #f8f9fa;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 15px;
`;

export const ReplyButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
`;
export const ReplyCancelButton = styled.div`
  font-size: 13px;
  cursor: pointer;
  color: gray;
  $:hover {
    color: black;
  }
`;

export const ReplyInputButton = styled.div`
  font-size: 13px;
  cursor: pointer;
  color: gray;
  $:hover {
    color: black;
  }
`;
