import styled from "styled-components";

export const HowlZone = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 40px;
  padding: 30px 20px 10px 20px;
`;

export const HowlPostWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  border-bottom: 1px solid black;
  margin-bottom: 30px;
`;

export const HowlPostInput = styled.input`
  border: none;
  font-size: 17px;
  width: 85%;
  height: 100%;
  padding: 0px 10px 0px 10px;
`;

export const HowlPostButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 80%;
  background-color: #f7dd07;
  font-weight: 700;
  border-radius: 7px;
  cursor: pointer;
`;

export const HowlPosts = styled.div`
  width: 100%;
  height: 70%;
  border-radius: 5px;
  margin-top: 20px;
  padding: 25px;
  background-color: #efefef;
  overflow-y: scroll;
`;

export const HowlPost = styled.div`
  width: 100%;
  height: 70px;
  border: 1px solid black;
  margin-bottom: 15px;
`;
