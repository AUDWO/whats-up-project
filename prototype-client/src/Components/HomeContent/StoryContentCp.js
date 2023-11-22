import React from "react";

//Styled-Components
import {
  StoryImg,
  StoryContent,
  StoryProfile,
  StoryProfileImg,
  StoryProfileName,
} from "../../StyledComponents/HomeContentStyle/StoryContentCpSt";

const StoryContentCp = ({ story }) => {
  return (
    <StoryContent>
      <StoryImg src={story.img} />
      <StoryProfile>
        <StoryProfileImg src={story.User.profileImg} />
        <StoryProfileName>{story.User.nickname}</StoryProfileName>
      </StoryProfile>
    </StoryContent>
  );
};

export default StoryContentCp;
