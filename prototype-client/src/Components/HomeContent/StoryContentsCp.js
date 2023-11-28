import React, { useState, useEffect } from "react";
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

  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    try {
      const response = await axios.get("/page/render-story");
      return response;
      //setStories([...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const info = useQuery({
    queryKey: ["storyContents"],
    queryFn: fetchStories,
  });

  console.log("info");
  console.log(info);
  console.log("data");
  console.log(info.data);
  console.log("data");

  useEffect(() => {
    setStoryModalOpen(false);
    //fetchStories();
  }, [storyUpdate]);
  /*
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
        {info.data.map((story) => {
          return (
            <Link to={`/more-story/${story.id}`} key={story.id}>
              <StoryContentCp index={story.id} story={story} />
            </Link>
          );
        })}
      </StoryContents>
    </StoryWrapper>
  );*/
};

export default StoryContentsCp;
