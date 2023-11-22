import styled from "styled-components";
import { BiTrendingUp } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";

export const DiaryNavWrapper = styled.div``;

export const DiaryNav = styled.div`
  width: 100%;
  height: 60px;
  opacity: 0.7;
  margin-left: 15px;
`;

export const DiaryFilterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const DiaryFilterOption = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

export const DiaryFilterOptionTitle = styled.span`
  font-size: 20px;
  ${(props) =>
    props.type === props.on ? "border-bottom: 1px solid black" : ""};
  cursor: pointer;
`;

export const DiaryTrendIcon = styled(BiTrendingUp)`
  margin-right: 10px;
`;

export const DiaryLatestIcon = styled(BsClockHistory)`
  margin-right: 10px;
`;

export const EmptySpace = styled.div`
  height: 60px;
`;
