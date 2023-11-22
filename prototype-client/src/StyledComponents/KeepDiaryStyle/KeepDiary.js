import styled from "styled-components";

export const DiaryOptionWrapper = styled.div`
  padding: 30px;
  height: 1100px;
`;

export const DiaryTextareaWrapper = styled.div`
  padding: 30px;
`;

export const KeepDiaryTitle = styled.input`
  font-size: 32px;
  font-weight: 700;
  width: 500px;
  height: 70px;
  border: none;
`;

export const DiaryTextarea = styled.textarea`
  width: 500px;
  height: 600px;
  padding: 20px 0px 20px 0px;
  font-size: 25px;
  border: none;
  outline: none;
`;

export const DiaryContentText = styled.div`
  font-size: 30px;
  color: #757575;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const PostDiaryButtonForm = styled.form`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

export const PostDiaryButton = styled.button`
  width: 100px;
  height: 40px;
  color: #858e96;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #14b885;
    color: white;
  }
`;

export const DeleteDiaryButton = styled.button`
  width: 100px;
  height: 40px;
  color: #858e96;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #ed203d;
    color: white;
  }
`;
