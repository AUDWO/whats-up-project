import styled from "styled-components";
import {
  DiaryPostWrapper,
  DiaryPostImgWrapper,
  DiaryPostInfoWrapper,
} from "./DiaryPost";

import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: black;
`;

export const DiarysWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

export const DiariesDiv = styled.div`
  display: grid;
  @media screen and (min-width: 1755px) {
    width: 95%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  @media screen and (min-width: 1389px) and (max-width: 1752px) {
    width: 1000px;
    grid-gap: 20px;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
  @media screen and (min-width: 1090px) and (max-width: 1388px) {
    width: 90%;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    ${DiaryPostWrapper} {
      width: 100%;
      position: relative;
      padding-top: 120%;
    }
    ${DiaryPostImgWrapper} {
      position: absolute;
      top: 0;
      height: 50%;
    }
    ${DiaryPostInfoWrapper} {
      position: absolute;
      bottom: 0;
      height: 50%;
    }
  }
  @media screen and (max-width: 1090px) {
    grid-gap: 20px;
    grid-template-columns: repeat(1, 1fr);
    width: 80%;
    ${DiaryPostWrapper} {
      width: 100%;
      padding-top: 120%;
    }
    ${DiaryPostImgWrapper} {
      position: absolute;
      top: 0;
      height: 50%;
    }
    ${DiaryPostInfoWrapper} {
      position: absolute;
      bottom: 0;
      height: 50%;
    }
  }

  width: 95%;
`;
