import React from "react";
import SectionContainer from "../../../StyledComponents/HomeStyle/SectionContainer";
import UserCp from "./UserCp";
import styled from "styled-components";
import NoUserCp from "./NoUserCp";

const CheckUserCp = () => {
  return (
    <SectionContainer3 width={"320px"}>
      <section>
        <NoUserCp />
      </section>
    </SectionContainer3>
  );
};

export default CheckUserCp;

export const SectionContainer3 = styled(SectionContainer)`
  position: absolute;
  right: 0;
  z-index: 1;
  width: ${(props) => props.width};
`;
