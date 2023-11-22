import styled from "styled-components";
import { GiPunchBlast } from "react-icons/gi";

export const SideBarWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  padding: 20px;
  border-right: 1px solid #dddee3;
  position: ${(props) => (props.position ? props.position : "")};
  left: 0;
  height: 100vh;
`;

export const WebTitleDiv = styled.div`
  margin-top: 60px;
  margin-bottom: 10px;
`;

export const MainIcon = styled(GiPunchBlast)`
  color: #f7dd07;
  font-size: 55px;
`;

export const FontColor = styled.span`
  font-size: 40px;
  color: ${(props) => (props.color ? props.color : "black")};
`;
