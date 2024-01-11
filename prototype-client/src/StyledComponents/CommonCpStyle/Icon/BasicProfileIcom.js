import styled from "styled-components";
import { FaUser } from "react-icons/fa6";

export const BasicProfileImg = styled(FaUser)`
  width: ${(props) => props.fontSize};
  height: ${(props) => props.fontSize};
  border-radius: 50%;
  color: white:
  padding: 20px;
  background-color: black;
`;
//font-size: ${(props) => props.fontSize};
