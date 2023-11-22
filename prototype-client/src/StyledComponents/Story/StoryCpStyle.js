import styled from "styled-components";

export const StoryContentsDiv = styled.div`
  width: 750px;
  height: 200px;
  display: flex;
  margin-bottom: 60px;
  margin-bottom: 60px;
`;

export const StoryContentsWrapper = styled.div`
  display: flex;
  width: 750px;
  height: 230px;
  padding: 15px 5px 15px 5px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: transparent;
  }
  position: relative;
  border: 1px solid black;
`;
