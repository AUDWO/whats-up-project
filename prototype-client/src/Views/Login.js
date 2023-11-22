import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//Styled-Components
import InputWrap from "../StyledComponents/LoginStyle/InputWrap";
import Middle from "../StyledComponents/Middle";
import LoginFormWrap from "../StyledComponents/LoginStyle/LoginFormWrap";
import LoginButton from "../StyledComponents/LoginStyle/ButtonStyle/LoginButton";
import Label from "../StyledComponents/LoginStyle/Label";
import Input from "../StyledComponents/LoginStyle/Input";

import WebTitleWrap from "../StyledComponents/LoginStyle/WebTitleWrap";
import WebTitle from "../StyledComponents/LoginStyle/WebTitle";
import {
  CheckUserWrapper,
  CheckUserContent,
  GoSignUp,
} from "../StyledComponents/LoginStyle/UserCheck";

//Component
import { MainIcon } from "../StyledComponents/MainSideBar/MainSideBarCpSt";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswCheck] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("실행했음");
    try {
      let response = await axios.post("/auth/login", formData);
      console.log("response.data");
      console.log(response.data);
      console.log("response.data");
      if (response.data === "discord" || response.data === "not exist") {
        setPasswCheck(true);
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formData = {
    email: email,
    password: password,
  };

  return (
    <Middle>
      <WebTitleWrap>
        <MainIconn />
        <WebTitle height={"40px"}>
          What<ColorLetter color={"#f7dd07"}>'</ColorLetter>s up
        </WebTitle>
      </WebTitleWrap>
      <CheckUserWrapper>
        <CheckUserContent>회원이 아니신가요?</CheckUserContent>
        <GoSignUp
          onClick={() => {
            navigate("/join");
          }}
        >
          회원가입 하기
        </GoSignUp>
      </CheckUserWrapper>
      <LoginFormWrap>
        <InputWrap>
          <Label>email</Label>
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </InputWrap>
        <InputWrap>
          <Label>password</Label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </InputWrap>
        {passwordCheck && (
          <UserLoginInfoDiscord>
            아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시
            확인해주세요.
          </UserLoginInfoDiscord>
        )}
        <LoginButton
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          로그인 하기
        </LoginButton>
      </LoginFormWrap>
    </Middle>
  );
};

export default Login;

export const UserLoginInfoDiscord = styled.div`
  color: #ee2540;
  margin-bottom: 20px;
`;

export const MainIconn = styled(MainIcon)`
  font-size: 70px;
`;

export const ColorLetter = styled.div`
  color: ${(props) => props.color};
`;
