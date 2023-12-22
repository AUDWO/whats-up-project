import styled from "styled-components";
import { BiSolidUserCircle } from "react-icons/bi";
import marginDynamic from "../../customCssFunc/marginCustom";
import paddingDynamic from "../../customCssFunc/paddingCustom";

export const ProfileWrapper = styled.div`
  cursor: pointer;
  position: ${(props) => (props.p ? props.p : "")};
  z-index: ${(props) => (props.zI ? props.zI : "")};
  width: ${(props) => props.width};
  left: ${(props) => (props.l ? props.l : "")};
  top: ${(props) => (props.t ? props.t : "")};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.jC ? props.jC : "space-between")};
  flex-direction: ${(props) => (props.fD ? props.fD : "")};
  ${(props) => marginDynamic(props.mg)};
  ${(props) => paddingDynamic(props.pd)};
`;

export const ProfileImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => marginDynamic(props.mg)};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  border-radius: 50%;
  border: ${(props) => (props.b === "on" ? "3px solid #f7dd07" : "")};
`;

export const ProfileImg = styled.img`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  z-index: ${(props) => (props.zI ? props.zI : "")};
  ${(props) => marginDynamic(props.mg)};
  border-radius: 50%;
  object-fit: cover;
`;

export const BasicProfileImg = styled(BiSolidUserCircle)`
  font-size: ${(props) => props.fS};
  z-index: ${(props) => (props.zI ? props.zI : "")};
  ${(props) => marginDynamic(props.mg)};

  border-radius: 50%;
  color: black;
  background-color: white;
`;

export const ProfileNickname = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.bC ? props.bC : "none")};
  color: ${(props) => (props.c ? props.c : "black")};
  border-radius: ${(props) => (props.bR ? props.bR : "none")};
  font-size: ${(props) => (props.fS ? props.fS : "")};
  font-weight:${(props) => (props.fW ? props.fW : "")}
  height: ${(props) => props.h};
  font-family:${(props) => props.fF};
  ${(props) => marginDynamic(props.mg)};
  ${(props) => paddingDynamic(props.pd)};
  
`;
