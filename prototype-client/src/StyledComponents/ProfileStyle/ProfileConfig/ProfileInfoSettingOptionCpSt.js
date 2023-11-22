import styled from "styled-components";

import { BiSolidUser } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const ProfileImgSelectButtonWrapper = styled.label`
  width: 40%;
  height: auto;
  display: flex;
  justify-content: center;
  font-size: 17px;
  border-radius: 10px;
  padding: 10px 0px;
  &:hover {
    background-color: #f6f9f9;
  }
  cursor: pointer;
`;

export const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-size: 100px;
  object-fit: cover;
`;

export const ProfileImgSelectIcon = styled(AiOutlinePlusCircle)`
  margin-right: 5px;
  font-size: 20px;
`;

export const ConfigImgOptionWrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const OptionTitle = styled.div``;

export const ProfileImgWrapper = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const BasicProfileImgIcon = styled(BiSolidUser)`
  border-radius: 50%;
  background-color: #dbdbdb;
  color: white;
  font-size: 100px;
  padding: 5px;
`;
