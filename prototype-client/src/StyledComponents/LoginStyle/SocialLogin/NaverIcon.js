import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { SiNaver } from "react-icons/si";

const NaverTheme = styled(Icon)`
  color: #02c75a;
`;

const NaverIcon = () => {
  return (
    <NaverTheme>
      <SiNaver />
    </NaverTheme>
  );
};

export default NaverIcon;
