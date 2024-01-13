import { useRef } from "react";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";
import ModalOpenAtom from "../store/ModalOpenAtom";
import { useNavigate } from "react-router-dom";

const LoginRequestMd = () => {
  const setLoginRequestMdOpen = useSetRecoilState(
    ModalOpenAtom("loginRequestMd")
  );

  const loginRequestBackground = useRef(null);
  const navigate = useNavigate();

  return (
    <LoginRequestMdBackground>
      <LoginRequestMdWrapper
        ref={loginRequestBackground}
        onClick={(e) => {
          if (e.target === loginRequestBackground.current) {
            setLoginRequestMdOpen(false);
          }
        }}
      >
        <MainRequestSentence>로그인이 하시겠습니까?</MainRequestSentence>
        <AdditionalRequestSentence>
          로그인 후 기능을 이용할 수 있어요!
        </AdditionalRequestSentence>
        <ButtonWrapper>
          <LoginButton
            onClick={() => {
              navigate("/");
              setLoginRequestMdOpen(false);
            }}
          >
            확인
          </LoginButton>
          <CancelButton
            onClick={() => {
              setLoginRequestMdOpen(false);
            }}
          >
            취소
          </CancelButton>
        </ButtonWrapper>
      </LoginRequestMdWrapper>
    </LoginRequestMdBackground>
  );
};

export default LoginRequestMd;

export const LoginRequestMdBackground = styled.div`
  position: fixed;
  z-index: 17;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginRequestMdWrapper = styled.div`
  width: 400px;
  height: 200px;
  border: 2px solid #f7dd07;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const LoginButton = styled.div`
  margin-right: 20px;
  background-color: #f7dd07;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
export const CancelButton = styled.div`
  margin-left: 20px;
  background-color: #f7dd07;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const MainRequestSentence = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const AdditionalRequestSentence = styled.div`
  color: #a3a3a3;
  font-size: 13px;
  margin-bottom: 25px;
`;
