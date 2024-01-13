import React from "react";
import styled from "styled-components";
import UserWrapper from "../../../StyledComponents/HomeStyle/Section3/UserWrapper";

const LoadingNotLoginCheckUserCp = () => {
  return (
    <UserWrapper>
      <LoginWrapper></LoginWrapper>
      <SignUpWrapper></SignUpWrapper>
    </UserWrapper>
  );
};

export default LoadingNotLoginCheckUserCp;

const LoginWrapper = styled.div`
  width: 140px;
  height: 40px;
  margin-bottom: 20px;
  background-color: #ddd9d9;
`;

const SignUpWrapper = styled.div`
  width: 140px;
  height: 40px;
  background-color: #ddd9d9;
`;
