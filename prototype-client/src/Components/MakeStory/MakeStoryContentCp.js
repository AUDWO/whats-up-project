import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";

//Styled-Componeny
import {
  MakeStoryContent,
  MakeStoryContentWrapper,
  MakeStoryFormWrapper,
  MakeStoryCancelButton,
  MakeStoryButton,
} from "../../StyledComponents/MakeStoryStyle/MakeStoryContentStyle";

//Atoms
import postImgAtom from "../../store/PostImgAtom";
import ModalOpenAtom from "../../store/ModalOpenAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserInfoValue } from "../../contextApi/UserInfoProvider";

//Component
import ProfileCp from "../Common/Profile/ProfileCp";
import DeleteStoryScheduled from "./DeleteStorySchedule";

const MakeStoryContentCp = () => {
  const [StoryModalOpen, setStoryModalOpen] = useRecoilState(
    ModalOpenAtom("makeStoryModal")
  );
  const [storyImgUrl, setStoryImgUrl] = useRecoilState(postImgAtom("storyImg"));

  const [content, setContent] = useState(null);

  const formData = new FormData();
  formData.append("img", storyImgUrl);

  const handleSubmitStoryImg = async (formData) => {
    try {
      const imgData = await axios.post("/post/storyimg", formData);
      return imgData;
    } catch (error) {
      console.error("handleSubmit Error", error);
    }
  };

  const handleSubmitStory = async (content, imgData) => {
    try {
      const postStoryResponse = await axios.post("/post/story", {
        content: content,
        url: imgData.data.url,
      });
      return postStoryResponse;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostStory = async () => {
    if (storyImgUrl) {
      try {
        const imgData = await handleSubmitStoryImg(formData);
        const response = await handleSubmitStory(content, imgData);
        return response;
      } catch (error) {
        console.error("게시 중 오류 발생:", error);
      }
    }
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handlePostStory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["storyContents"] });
    },
    onError: (error) => {
      console.log("onErrorData", error);
    },
  });

  const userInfo = useUserInfoValue();

  return (
    <MakeStoryContentWrapper>
      <ProfileCp
        pfW={{
          justifyC: "flex-start",
          padding: { t: "20", l: "20", b: "20", r: "20" },
        }}
        pfI={{
          width: "50px",
          height: "50px",
          margin: { r: "15" },
          basic: "50px",
        }}
        pfN={{ fontS: "16px", fontW: "600" }}
        pfInfo={userInfo}
      />
      <MakeStoryContent
        placeholder="내용을 입력하세요!"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <DeleteStoryScheduled />
      <MakeStoryFormWrapper>
        <MakeStoryButton
          onClick={() => {
            mutate();
            setStoryModalOpen(!StoryModalOpen);
            setStoryImgUrl(null);
          }}
        >
          게시하기
        </MakeStoryButton>
        <MakeStoryCancelButton
          onClick={() => {
            setStoryModalOpen(false);
            setStoryImgUrl(null);
          }}
        >
          삭제하기
        </MakeStoryCancelButton>
      </MakeStoryFormWrapper>
    </MakeStoryContentWrapper>
  );
};

export default MakeStoryContentCp;
