import styled, { css } from "styled-components";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { BsJournalBookmark } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoReorderThreeSharp } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";

let marginDirection = {
  marginL: "margin-left",
  marginR: "margin-right",
  marginB: "margin-bottom",
  marginT: "margin-top",
};

let marginDynamic = (props) => {
  let marginValue = ``;

  for (const key in props) {
    if (marginDirection[key]) {
      marginValue += `
      ${marginDirection[key]} : ${props[key]}px
      `;
    }
  }

  return marginValue;
};

let cursorPointer = css`
  cursor: pointer;
`;

const size = css`
  font-size: 25px;
  fontweight: 700;
`;

export const HomeIcon = styled(BiHomeAlt2)`
  font-weight: 800;
  ${cursorPointer};
  ${size};
  ${(props) => marginDynamic(props)};
  m
`;

export const SearchIcon = styled(BsSearch)`
  ${cursorPointer};
  ${size};
  ${(props) => marginDynamic(props)};
`;

export const DiaryIcon = styled(BsJournalBookmark)`
  ${cursorPointer};
  ${size};
  ${(props) => marginDynamic(props)};
`;

export const NewPostIcon = styled(AiOutlineAppstoreAdd)`
  ${cursorPointer};
  ${size};
  ${(props) => marginDynamic(props)};
`;

export const KeepDiaryIcon = styled(BsPencilSquare)`
  ${cursorPointer};
  ${size};
  ${(props) => marginDynamic(props)};
`;

export const UserIcon = styled(HiOutlineUserCircle)`
  ${cursorPointer};
  font-size: 30px;
  ${(props) => marginDynamic(props)};
`;

export const MoreIcon = styled(IoReorderThreeSharp)`
  ${cursorPointer};
  ${size};
  ${(props) => marginDynamic(props)};
  position: relative;
`;
