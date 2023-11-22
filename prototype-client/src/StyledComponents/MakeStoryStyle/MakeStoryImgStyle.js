import styled from "styled-components";

export const MakeStoryImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const MakeStoryImgSelectWrapper = styled.div``;

export const MakeStoryImgFormWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 100px;
`;

export const MakeStoryImgSelectButton = styled.label`
  font-size: 15px;
  font-weight: 600;
  height: 45px;
  line-height: 45px;
  padding-left: 15px;
  padding-right: 15px;
  color: black;
  border-radius: 10px;
  border: 1px solid black;
  &:hover {
    background-color: #f1f4f7;
  }
  cursor: pointer;
`;

export const MakeStoryImgInput = styled.input``;

export const MakeStoryImg = styled.img`
  position: absolute;
  z-index: 3;
  object-fit: cover;
  width: 400px;
  height: 500px;
`;
