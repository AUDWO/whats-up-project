import styled from "styled-components";

export const MoreModalWrapper = styled.div`
  width: 200px;
  height: 225px;
  border-radius: 10px;
  background-color: #ffffff;
  position: fixed;
  z-index: 5;
  left: 60px;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  padding: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

export const MoreOptionWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const MoreOption = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #efefef;
  }
  cursorpointer;
`;
