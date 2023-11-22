import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

//Components
import MainSideBarCp from "../Components/MainSideBar/MainSideBarCp";

//import MoreStoryContentCp from "../Components/More/MoreStory/MoreStoryContentCp";
import MoreStoryContentCp from "../Components/MoreStory/MoreStoryContentCp";
import MoreCommentsCp from "../Components/Common/More/MoreComment/MoreCommentsCp";

const MoreStory = () => {
  const { storyId } = useParams();
  return (
    <Wrapper>
      <HomeWrapper2>
        <MainSideBarCp />
        <MoreStoryContentCp storyId={storyId}></MoreStoryContentCp>
        <Section3 />
      </HomeWrapper2>
      <MoreCommentsCp storyId={storyId} />
    </Wrapper>
  );
};

export default MoreStory;

export const Section3 = styled.div`
  width: 340px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export const HomeWrapper2 = styled.div`
  width: 100%;
  height: auto;
  display: flex;
`;

export const MoreStoryProfileWrapper = styled.div`
  display: flex;
  width: 200px;
  height: 100px;
`;

export const MoreStoryImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const MoreStoryContact = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
`;
