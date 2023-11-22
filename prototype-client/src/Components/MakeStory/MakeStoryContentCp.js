import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";

//Styled-Componeny
import {
  MakeStoryContent,
  MakeStoryContentWrapper,
  MakeStoryProfileImg,
  MakeStoryProfileWrapper,
  MakeStoryNickname,
  MakeStoryFormWrapper,
  MakeStoryCancelButton,
  MakeStoryButton,
} from "../../StyledComponents/MakeStoryStyle/MakeStoryContentStyle";

//Atoms
import postImgAtom from "../../store/PostImgAtom";
import stateUpdateAtom from "../../store/stateUpdateAtom";
import ModalOpenAtom from "../../store/ModalOpenAtom";

const MakeStoryContentCp = () => {
  const [StoryModalOpen, setStoryModalOpen] = useRecoilState(
    ModalOpenAtom("makeStoryModal")
  );
  const [storyUpdate, setStoryUdate] = useRecoilState(stateUpdateAtom("story"));
  const [storyImgUrl, setStoryImgUrl] = useRecoilState(postImgAtom("storyImg"));

  const [content, setContent] = useState(null);

  const formData = new FormData();
  formData.append("img", storyImgUrl);

  const handlePostStory = async () => {
    if (storyImgUrl) {
      try {
        const imgData = await axios.post("/post/storyimg", formData);

        const response = await axios.post("/post/story", {
          content: content,
          url: imgData.data.url,
        });

        const handle = () => {
          setStoryUdate(!storyUpdate);
        };
        handle();
      } catch (error) {
        console.error("게시 중 오류 발생:", error);
      }
    }
  };

  return (
    <MakeStoryContentWrapper>
      <MakeStoryProfileWrapper>
        <MakeStoryProfileImg></MakeStoryProfileImg>
        <MakeStoryNickname>myeongjae_7053</MakeStoryNickname>
      </MakeStoryProfileWrapper>
      <MakeStoryContent
        placeholder="내용을 입력하세요!"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <MakeStoryFormWrapper>
        <MakeStoryButton
          onClick={() => {
            handlePostStory();
            setStoryModalOpen(!StoryModalOpen);
            setStoryImgUrl(null);
          }}
        >
          게시하기
        </MakeStoryButton>
        <MakeStoryCancelButton onClick={() => {}}>
          삭제하기
        </MakeStoryCancelButton>
      </MakeStoryFormWrapper>
    </MakeStoryContentWrapper>
  );
};

export default MakeStoryContentCp;
