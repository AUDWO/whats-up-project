import React from "react";
import styled from "styled-components";
import UserWrapper from "../../../StyledComponents/HomeStyle/Section3/UserWrapper";

const LoadingCheckUserCp = () => {
  return (
    <UserWrapper>
      <LoadingProfileWrapper>
        <LoadingProfileImg />
        <LoadingProfileNickname />
      </LoadingProfileWrapper>
      <LoadingContentsInfoWrapper>
        <LoadingContentInfoWrapper>
          <LoadingContentTitle />
          <LoadingContentNumber />
        </LoadingContentInfoWrapper>
        <LoadingContentInfoWrapper>
          <LoadingContentTitle />
          <LoadingContentNumber />
        </LoadingContentInfoWrapper>
      </LoadingContentsInfoWrapper>
    </UserWrapper>
  );
};

export default LoadingCheckUserCp;

const LoadingProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingProfileImg = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ddd9d9;
`;

const LoadingProfileNickname = styled.div`
  height: 17px;
  width: 50px;
  background-color: #ddd9d9;
  margin-left: 15px;
`;

const LoadingContentsInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const LoadingContentInfoWrapper = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoadingContentTitle = styled.div`
  width: 35px;
  height: 17px;
  background-color: #ddd9d9;
  margin-bottom: 5px;
`;

const LoadingContentNumber = styled.div`
  width: 17px;
  height: 24px;
  background-color: #ddd9d9;
`;
