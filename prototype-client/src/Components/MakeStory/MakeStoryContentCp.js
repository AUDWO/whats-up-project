import React, { useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

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
import userInfoAtom from "../../store/userState/userAtom";

//Queries
import { useQueryClient, useMutation } from "@tanstack/react-query";

const MakeStoryContentCp = () => {
  const [StoryModalOpen, setStoryModalOpen] = useRecoilState(
    ModalOpenAtom("makeStoryModal")
  );
  const [storyUpdate, setStoryUdate] = useRecoilState(stateUpdateAtom("story"));
  const [storyImgUrl, setStoryImgUrl] = useRecoilState(postImgAtom("storyImg"));

  const queryClient = useQueryClient();

  const [content, setContent] = useState(null);

  const formData = new FormData();
  formData.append("img", storyImgUrl);

  /*
  const handlePostStory = async () => {
    if (storyImgUrl) {
      try {
        const imgData = await axios.post("/post/storyimg", formData);

        const response = await axios.post("/post/story", {
          content: content,
          url: imgData.data.url,
        });
      } catch (error) {
        console.error("게시 중 오류 발생:", error);
      }
    }
    if (!storyImgUrl) alert("사진을 선택해주세요.");
  };*/

  /*
  const handle = () => {
    setStoryUdate(!storyUpdate);
  };
  handle();
  
  */

  const handleSubmitPostStory = async () => {
    try {
      const imgData = await axios.post("/post/storyimg", formData);

      const response = await axios.post("/post/story", {
        content: content,
        url: imgData.data.url,
      });
    } catch (error) {
      console.error("게시 중 오류 발생:", error);
    }
  };

  const userInfo = useRecoilValue(userInfoAtom);

  const mutation = useMutation(handleSubmitPostStory, {
    onSuccess: () => {
      queryClient.invalidateQueries("storyContents");
    },
    onError: (error) => {
      console.error("게시 중 오류 발생", error);
    },
  });

  const handlePostStory = async () => {
    if (storyImgUrl) {
      try {
        await mutation.mutateAsync();
        setStoryModalOpen(!StoryModalOpen);
        setStoryImgUrl(null);
      } catch (error) {
        console.error(error);
      }
    }
    if (!storyImgUrl) alert("사진을 선택해주세요.");
  };

  return (
    <MakeStoryContentWrapper>
      <MakeStoryProfileWrapper>
        <MakeStoryProfileImg src={userInfo.img} />
        <MakeStoryNickname>{userInfo.nickname}</MakeStoryNickname>
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
            /*
            setStoryModalOpen(!StoryModalOpen);
            setStoryImgUrl(null);
            */
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
