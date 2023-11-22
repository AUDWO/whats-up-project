import React from "react";

import SectionContainer from "../../StyledComponents/HomeStyle/SectionContainer";
import UserPosts from "../../UserPosts";
import styled from "styled-components";
import PostContentsWrapper from "../../StyledComponents/HomeStyle/Section2/PostContentsWrapper";

//Component
import StoryContentsCp from "./StoryContentsCp";

const HomeContentsCp = () => {
  return (
    <SectionContainer2 flex="1">
      <PostContentsWrapper>
        <StoryContentsCp />
        <UserPosts />
      </PostContentsWrapper>
    </SectionContainer2>
  );
};

const SectionContainer2 = styled(SectionContainer)`
  align-items: center;
  padding: 60px 20px 60px 20px;
  width: 880px;
`;

export default HomeContentsCp;
