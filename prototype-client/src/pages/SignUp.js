import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled-Components
import Middle from "../StyledComponents/Middle";
import LoginFormWrap from "../StyledComponents/LoginStyle/LoginFormWrap";
import LoginButton from "../StyledComponents/LoginStyle/ButtonStyle/LoginButton";
import Label from "../StyledComponents/LoginStyle/Label";
import { Input } from "../StyledComponents/CommonCpStyle/Input/Input";

import WebTitleWrap from "../StyledComponents/LoginStyle/WebTitleWrap";
import WebTitle from "../StyledComponents/LoginStyle/WebTitle";
import {
  CheckUserWrapper,
  CheckUserContent,
  GoSignUp,
} from "../StyledComponents/LoginStyle/UserCheck";
import { Unsatisfied, Satisfied } from "../StyledComponents/LoginStyle/Error";
import { MainIcon } from "../StyledComponents/CommonCpStyle/Icon/MainIcon";

//icon
import { BsCheckCircle } from "react-icons/bs";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordDiscord, setPasswordDiscord] = useState(false);
  const [passwordFit, setPasswordFit] = useState(false);

  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const [emailCheckResponse, setEmailCheckResponse] = useState(false);
  const [nicknameCheckResponse, setNicknameCheckResponse] = useState(false);

  const navigate = useNavigate();

  let formData = {
    password: password,
    email: email,
    nickname: nickname,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== passwordCheck) {
        return;
      }
      const response = await axios.post("/auth/sign-up", formData);
      alert("회원가입 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePasswordFittBlur = (e) => {
    const value = e.target.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (passwordRegex.test(value)) {
      setPasswordFit(false);
    }

    if (!passwordRegex.test(value)) {
      setPasswordFit(true);
    }
  };

  const handlePasswordDiscordBlur = (e) => {
    if (password === passwordCheck) {
      setPasswordDiscord(false);
    }
    if (password !== passwordCheck) {
      setPasswordDiscord(true);
    }
  };

  const checkUserEmail = async () => {
    try {
      const response = await axios.get(`/page/user-email-check/${email}`);
      setEmailCheckResponse(true);

      if (response.data === "allowEmail") {
        setEmailCheck(true);
      }
      if (response.data === "disallowEmail") {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkUserNickname = async () => {
    try {
      const response = await axios.get(`/page/user-nickname-check/${nickname}`);
      setNicknameCheckResponse(true);
      if (response.data === "allowNickname") {
        setNicknameCheck(true);
      }
      if (response.data === "disallowNickname") {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Middle>
      <WebTitleWrap>
        <MainIcon fontSize={"70px"} />
        <WebTitle>WHAT'S UP</WebTitle>
      </WebTitleWrap>
      <CheckUserWrapper>
        <CheckUserContent>이미 회원이신가요?</CheckUserContent>
        <GoSignUp
          onClick={() => {
            navigate("/");
          }}
        >
          로그인 하기
        </GoSignUp>
      </CheckUserWrapper>
      <LoginFormWrap onSubmit={handleSubmit}>
        <InputWrap>
          <Label>email</Label>
          <InputCheckWrapper>
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailCheck(false);
              }}
              fontSize="17px"
              width="340px"
              height="47px"
              borderR="7px"
              padding="10px"
              marginB="10"
              backC="white"
            />
            <CheckUserInfoWrapper>
              {emailCheck ? (
                <AllowUserInfoIcon />
              ) : (
                <CheckUserInfoIcon onClick={checkUserEmail} />
              )}
            </CheckUserInfoWrapper>
          </InputCheckWrapper>
          {emailCheckResponse ? (
            <>
              {emailCheck ? (
                <Satisfied>사용 가능한 이메일 입니다.</Satisfied>
              ) : (
                <Unsatisfied>이미 존재하는 이메일 입니다.</Unsatisfied>
              )}
            </>
          ) : (
            <Unsatisfied>사용 가능한 이메일인지 확인해주세요.</Unsatisfied>
          )}
        </InputWrap>
        <InputWrap>
          <Label>nickName</Label>
          <InputCheckWrapper>
            <Input
              type="text"
              name="nickName"
              placeholder="닉네임 ( 15자리 이내 )"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              fontSize="17px"
              width="340px"
              height="47px"
              borderR="7px"
              padding="10px"
              marginB="10"
              backC="white"
            />
            <CheckUserInfoWrapper>
              {nicknameCheck ? (
                <AllowUserInfoIcon />
              ) : (
                <CheckUserInfoIcon onClick={checkUserNickname} />
              )}
            </CheckUserInfoWrapper>
          </InputCheckWrapper>
          {nicknameCheckResponse ? (
            <>
              {nicknameCheck ? (
                <Satisfied>사용 가능한 닉네임입니다.</Satisfied>
              ) : (
                <Unsatisfied>이미 존재하는 닉네임 입니다.</Unsatisfied>
              )}
            </>
          ) : (
            <Unsatisfied>사용 가능한 닉네임인지 확인해주세요.</Unsatisfied>
          )}
        </InputWrap>

        <InputWrap>
          <Label>password</Label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            onBlur={handlePasswordFittBlur}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            width="400px"
            height="50px"
            fontSize="17px"
            borderR="7px"
            padding="10px"
            marginB="10"
            backC="white"
            border={{ borderPx: "1px", color: "#dddee3" }}
          />
          {passwordFit && (
            <Unsatisfied>
              비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.
            </Unsatisfied>
          )}
        </InputWrap>
        <InputWrap>
          <Label>password check</Label>
          <Input
            type="password"
            name="passwordCheck"
            onBlur={handlePasswordDiscordBlur}
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
            width="400px"
            height="50px"
            fontSize="17px"
            borderR="7px"
            padding="10px"
            marginB="10"
            backC="white"
            border={{ borderPx: "1px", color: "#dddee3" }}
          />
          {passwordDiscord && (
            <Unsatisfied>비밀번호가 일치하지 않습니다.</Unsatisfied>
          )}
        </InputWrap>
        <LoginButton type="submit">회원가입</LoginButton>
        <EmptySpace></EmptySpace>
      </LoginFormWrap>
    </Middle>
  );
};

export default SignUp;

export const EmptySpace = styled.div`
  width: 200px;
  height: 100px;
`;

export const CheckUserInfoWrapper = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CheckUserInfoIcon = styled(BsCheckCircle)`
  font-size: 25px;
  color: #dddee3;
  cursor: pointer;
`;

export const AllowUserInfoIcon = styled(BsCheckCircle)`
  font-size: 25px;
  color: #1ec997;
  cursor: pointer;
`;

export const InputCheckWrapper = styled.div`
  font-size: 17px;
  height: 50px;
  width: 400px;
  border-radius: 7px;
  border: 1px solid #dddee3;
  margin-bottom: 10px;
  background-color: white;
  display: flex;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;
