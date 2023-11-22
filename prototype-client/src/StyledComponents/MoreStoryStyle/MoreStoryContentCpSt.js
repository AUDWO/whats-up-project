import styled from "styled-components";
import { BsDot } from "react-icons/bs";

export const MoreStoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-left: 1px solid #dddee3;
`;
export const MoreStoryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MoreStoryContent = styled.div`
  color: #636363;
  font-size: 18px;
  min-height: 100px;
  height: auto;
  line-height: 1.7;
  margin-top: 30px;
  margin-bottom: 40px;
`;

export const MoreStoryContentDiv = styled.div`
  margin-top: 60px;
`;

export const MoreStoryTimepass = styled.div`
  font-size: 15px;
  color: #737373;
`;

export const MoreStoryContentsWrapper = styled.div`
  width: 700px;
  height: auto;
`;

export const MoreStoryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 200px;
  height: auto;
`;

export const MoreStoryProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
  margin-right: 10px;
`;

export const MoreStoryProfileName = styled.div`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const MoreStoryProfileWrapper = styled.div`
  display: flex;
  width: 200px;
  height: 100px;
`;

export const MoreStoryTimepassDot = styled(BsDot)``;

export const MoreStoyrImgWrapper = styled.div`
  width: 100%;
  height: 800px;
  background-color: black;
`;

export const MoreStoryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
