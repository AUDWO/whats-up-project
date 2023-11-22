import React from "react";
import SectionContainer from "../../StyledComponents/HomeStyle/SectionContainer";
import User from "../User";
import styled from "styled-components";

const Section3 = () => {
  return (
    <SectionContainer3 width={"320px"}>
      <section>
        <User />
      </section>
    </SectionContainer3>
  );
};

export default Section3;

export const SectionContainer3 = styled(SectionContainer)`
  position: absolute;
  right: 0;
  z-index: 1;
  width: ${(props) => props.width};
`;
