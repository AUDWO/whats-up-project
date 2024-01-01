import styled from "styled-components";

export const MakeStoryContentWrapper = styled.div`
  width: 50%;
  height: 100%;
  border-left: 1px solid #dbdbdb;
`;

export const MakeStoryContent = styled.textarea`
  width: 100%;
  height: 140px;
  border: none;
  line-height: 1.3;
  padding: 10px 20px 10px 20px;
  font-size: 16px;
  outline: none;
  resize: none;
`;

export const MakeStoryFormWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

export const Button = styled.div`
  background-color: #f8f9fa;
  padding: 10px 20px 10px 20px;
  font-size: 15px;
  border-radius: 7px;
  cursor: pointer;
`;

export const MakeStoryButton = styled(Button)`
  color: black;
`;

export const MakeStoryCancelButton = styled(Button)`
  color: #ed203d;
`;
