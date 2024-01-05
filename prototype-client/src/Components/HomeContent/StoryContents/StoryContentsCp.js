import { useRecoilState } from "recoil";
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
} from "../../../StyledComponents/HomeContentStyle/StoryContentsCpSt";

//Component
import StoryContentCp from "./StoryContentCp";

//Atom
import ModalOpenAtom from "../../../store/ModalOpenAtom";

const StoryContentsCp = () => {
  const [storyModalOpen, setStoryModalOpen] = useRecoilState(
    ModalOpenAtom("makeStoryModal")
  );

  const getAllStory = async () => {
    try {
      return await axios.get("/page/render-story");
    } catch (error) {
      console.error(error);
    }
  };

  const { data: storyContentsInfo, isLoading } = useQuery({
    queryKey: ["storyContents"],
    queryFn: getAllStory,
  });

  if (isLoading) {
    return (
      <StoryWrapper>
        <StoryContents>
          <StoryContentCp backC={"#DDD9D9"} />
          <StoryContentCp backC={"#DDD9D9"} />
          <StoryContentCp backC={"#DDD9D9"} />
          <StoryContentCp backC={"#DDD9D9"} />
          <StoryContentCp backC={"#DDD9D9"} />
        </StoryContents>
      </StoryWrapper>
    );
  }

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
        {storyContentsInfo.data.map((story) => {
          return (
            <Link to={`/more-story/${story.id}`} key={story.id}>
              <StoryContentCp index={story.id} story={story} />
            </Link>
          );
        })}
      </StoryContents>
    </StoryWrapper>
  );
};

export default StoryContentsCp;
