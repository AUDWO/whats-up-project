import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export const DiaryPublicOnIcon = styled(FaLockOpen)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 25px;
  color: black;
`;

export const DiaryPublicOffIcon = styled(FaLock)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 25px;
  color: black;
`;

export const ContentsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export const ContentCardsWrapper = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-gap: 10px;
`;

export const ContentCard = styled.img`
  width: 350px;
  height: 350px;
  background-color: black;
  object-fit: cover;
  cursor: pointer;
`;

export const ContentCardNoImg = styled.div`
  width: 350px;
  height: 350px;
  background-color: #f7dd07;
  color: black;
  object-fit: cover;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 90px;
  font-weight: 700;
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const ContentConfigIcon = styled(BsThreeDotsVertical)`
  font-size: 30px;
  position: absolute;
  top: 10px;
  right: 15px;
  opacity: 0;
  border-radius: 50%;
  color: #f7dd07;
  background-color: rgba(128, 128, 128, 0.5);
  cursor: pointer;
  transition: all 0.1s;
  padding: 4px;
  z-index: 99;
`;

export const ContentCardWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  background-color: black;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    ${ContentConfigIcon} {
      opacity: 1;
    }
  }
`;

export const SpaceCp = styled.div`
  width: 100px;
  height: 100px;
`;
