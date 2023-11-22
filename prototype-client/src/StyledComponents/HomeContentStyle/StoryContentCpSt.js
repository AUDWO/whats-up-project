import styled from "styled-components";

export const StoryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

export const StoryContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 130px;
  height: 180px;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02); /* 확대하는 변환을 적용 */
    border: 3px solid black;
  }
`;

export const StoryProfile = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  width: 110px;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const StoryProfileImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  margin-bottom: 7px;
  object-fit: cover;
  border: 1px solid black;
`;

export const StoryProfileName = styled.div`
  background-color: black;
  color: #fae66a;
  border-radius: 10px;
  font-size: 12px;
  font-family: "Gothic A1", sans-serif;
  padding: 5px 7px 5px 7px;
  text-align: center;
`;
