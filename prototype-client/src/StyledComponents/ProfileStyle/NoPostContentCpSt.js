import styled from "styled-components";
import { IoAddSharp } from "react-icons/io5";

export const MakeIcon = styled(IoAddSharp)`
  background-color: gray;
  opacity: 0.1;
  border-radius: 50%;
  font-weight: 100;
  font-size: 60px;
  margin-bottom: 20px;
  &:hover {
    opacity: 0.3;
  }
  cursor: pointer;
`;

export const NoContentPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
`;
export const NoContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 300px;
`;

export const NoContentTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const NoContent = styled.div`
  margin-bottom: 20px;
`;

export const MakeContentButton = styled.button`
  font-size: 15px;
  color: #f7dd12;
  &:hover {
    color: black;
  }
`;
