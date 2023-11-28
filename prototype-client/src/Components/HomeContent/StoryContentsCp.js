import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//Styled-Components
import {
  StoryWrapper,
  StoryContents,
  MakeStoryContent,
  StoryProfile,
  MakeStoryProfileImg,
  PlusIcon,
  StoryProfileName,
} from "../../StyledComponents/HomeContentStyle/StoryContentsCpSt";

//Component
import StoryContentCp from "./StoryContentCp";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";
import stateUpdateAtom from "../../store/stateUpdateAtom";

const StoryContentsCp = () => {
  const storyUpdate = useRecoilValue(stateUpdateAtom("story"));

  const [storyModalOpen, setStoryModalOpen] = useRecoilState(
    ModalOpenAtom("makeStoryModal")
  );

  const fetchStories = async () => {
    try {
      const response = await axios.get("/page/render-story");

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const storiesInfo = useQuery({
    queryKey: ["storyContents"],
    queryFn: fetchStories,
  });

  useEffect(() => {
    setStoryModalOpen(false);
  }, [storyUpdate]);

  if (storiesInfo.data) {
    return (
      <StoryWrapper>
        <StoryContents>
          <MakeStoryContent
            onClick={() => {
              setStoryModalOpen(!storyModalOpen);
            }}
          >
            <StoryProfile>
              <MakeStoryProfileImg>
                <PlusIcon />
              </MakeStoryProfileImg>
              <StoryProfileName>Make story</StoryProfileName>
            </StoryProfile>
          </MakeStoryContent>
          {storiesInfo.data.map((story) => {
            return (
              <Link to={`/more-story/${story.id}`} key={story.id}>
                <StoryContentCp index={story.id} story={story} />
              </Link>
            );
          })}
        </StoryContents>
      </StoryWrapper>
    );
  }
};

export default StoryContentsCp;
