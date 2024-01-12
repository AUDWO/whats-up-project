import styled from "styled-components";

export const StoryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 17px;
  background-color: ${(props) => props.backC};
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
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.02); /* 확대하는 변환을 적용 */
    border: 3px solid black;
  }
`;
