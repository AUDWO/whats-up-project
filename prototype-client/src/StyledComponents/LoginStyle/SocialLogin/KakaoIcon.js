import styled from "styled-components";
import Icon from "../Icon";

import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
const KakaoTheme = styled(Icon)`
  color: #fae100;
  font-size: 35px;
`;

const KakaoIcon = () => {
  return (
    <KakaoTheme>
      <RiKakaoTalkFill />
    </KakaoTheme>
  );
};

export default KakaoIcon;
