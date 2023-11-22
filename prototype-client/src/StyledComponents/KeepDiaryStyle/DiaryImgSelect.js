import styled from "styled-components";

export const DiaryImgButtonWrapper = styled.div`
  display: flex;
`;

export const DiaryImgCancelButton = styled.div`
  width: 100px;
  height: 40px;
  text-align: center;
  padding: 10px;
  border-radius: 7px;
  color: #858e96;
  margin-right: 40px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    color: #f7dd07;
  }
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

export const DiaryImgButton = styled.label`
  width: 100px;
  height: 40px;
  text-align: center;
  padding: 10px;
  border-radius: 7px;
  color: #858e96;
  margin-right: 40px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    color: #f7dd07;
  }
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

export const DiaryImgWrapper = styled.div`
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 350px;
`;

export const DiaryImgInput = styled.input`
  display: none;
`;

export const DiaryImgForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

export const DiaryImgDiv = styled.div`
  width: 100%;
  height: 100%;
`;

export const DiaryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
