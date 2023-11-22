import React from "react";

import {
  PlusIcon,
  MakeStoryContent,
  StoryProfile,
  MakeStoryProfileImg,
  StoryProfileName,
} from "../../StyledComponents/Story/StoryCpStyle";

const MakeStoryContentCp = () => {
  return (
    <MakeStoryContent>
      <StoryProfile>
        <MakeStoryProfileImg>
          <PlusIcon />
        </MakeStoryProfileImg>
        <StoryProfileName>Howling</StoryProfileName>
      </StoryProfile>
    </MakeStoryContent>
  );
};

export default MakeStoryContentCp;
