import React from "react";

import styled from "styled-components";
import UserWrapper from "../../../StyledComponents/HomeStyle/Section3/UserWrapper";

const NoUserCp = () => {
  return (
    <UserWrapper>
      <LoginWrapper>
        <LoginText>Login</LoginText>
      </LoginWrapper>
      <SignUpWrapper>
        <SignUpText>Sign Up</SignUpText>
      </SignUpWrapper>
    </UserWrapper>
  );
};

export default NoUserCp;

const NoUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  width: 140px;
  height: 40px;
  margin-bottom: 20px;
  background-color: #f7dd07;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
`;

const SignUpWrapper = styled.div`
  width: 140px;
  height: 40px;
  background-color: black;
  color: #f7dd07;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const SignUpText = styled.div`
  color: #f7dd07;
  font-size: 14px;
  font-weight: 900;
`;
