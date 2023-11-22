import styled, { keyframes } from "styled-components";
import { BiSolidArrowToBottom } from "react-icons/bi";
import { BiSolidArrowToTop } from "react-icons/bi";

export const ProfileWrapper = styled.div`
  cursor: pointer;
`;

//---------
export const Profile = styled.div`
  position: absolute;
  left: 20px;
  top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileImg = styled.img`
  background-color: black;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 4;
`;

export const ProfileImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border-radius: 50%;
  width: 51px;
  height: 51px;
  border: 3px solid #f7dd07;
`;

export const ProfileUsername = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  border-radius: 10px;
  height: 30px;
  font-size: 13px;
  padding: 5px;
  color: #f7dd07;
`;

export const PostImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 4;
  width: 480px;
  min-height: 585px;
  height: auto;
  transition: all 0.3s ease-in-out;
  transform: ${({ click }) => (click ? "translate3d(-150px, 0, 0)" : "none")};
`;

export const PostImg = styled.img`
  width: 100%;
  height: 585px;
  background-color: white;

  object-fit: cover;
`;

export const PostContentsWrapper = styled.div`
  border: 3px solid #f7dd07;
  background-color: white;
  width: 100%;
  min-height: 20px;
  height: auto;
`;

export const PostContentOpenIcon = styled(BiSolidArrowToBottom)`
  color: #a8abac;
  font-size: 25px;
  transition: all 0.6s;
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

export const PostContentCloseIcon = styled(BiSolidArrowToTop)`
  color: #a8abac;
  font-size: 25px;
  transition: all 0.6s;
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

const smoothAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);

  }
  to {
    opacity: 1;
    transform: translateY(0%);
    border-top: 0.5px solid black;

  }
`;

export const PostContent = styled.div`
  border-top: 0.5px solid black;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  line-height: 1.5;
  padding: 10px;
  animation: ${smoothAppear} 1s forwards;
`;
export const PostTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0px 10px 0px 10px;
`;

export const PostUserInfoWrapper = styled.div`
  display: flex;
`;
export const PostUserName = styled.div`
  font-weight: 700;
  margin-right: 10px;
`;

export const PostTitle = styled.div`
  display: flex;
  align-items: center;

  font-size: 15px;
  font-weight: 350;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  border-radius: 5px;
`;
