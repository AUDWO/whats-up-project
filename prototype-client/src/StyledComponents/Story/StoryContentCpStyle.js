import styled from "styled-components";

export const StoryProfileImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  margin-bottom: 7px;
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
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const MakeStoryContent = styled(StoryContent)`
  background-color: #f7dd07;
`;

export const MakeStoryProfileImg = styled(StoryProfileImg)`
  & :hover {
    color: #f7dd07;
  }
`;
