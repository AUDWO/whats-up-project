/*import React, { useState } from "react";
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
} from "../../StyledComponents/MakeStoryStyle/MakeStoryContentStyle";*/

//Atoms
/*
import postImgAtom from "../../store/PostImgAtom";
import stateUpdateAtom from "../../store/stateUpdateAtom";
import ModalOpenAtom from "../../store/ModalOpenAtom";
import userInfoAtom from "../../store/userState/userAtom";*/

//Queries
//import { useQueryClient, useMutation } from "@tanstack/react-query";

/*
const MakeStoryContentCp = () => {
  const [StoryModalOpen, setStoryModalOpen] = useRecoilState(
    ModalOpenAtom("makeStoryModal")
  );
  const [storyUpdate, setStoryUdate] = useRecoilState(stateUpdateAtom("story"));
  const [storyImgUrl, setStoryImgUrl] = useRecoilState(postImgAtom("storyImg"));

  //const queryClient = useQueryClient();

  const [content, setContent] = useState(null);

  const formData = new FormData();
  formData.append("img", storyImgUrl);
  const userInfo = useRecoilValue(userInfoAtom);*/

/*
  const handlePostStory2 = async () => {
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
  };*/

/*
  const handle = () => {
    setStoryUdate(!storyUpdate);
  };
  handle();
  
  */

/*

  const handleSubmitPostStoryImg = async () => {
    console.log("handleSubmitPostStoryImg시작");
    try {
      console.log("handleSubmitPostStoryImg 실행중");
      const imgData = await axios.post("/post/storyimg", formData);
      return imgData;
    } catch (error) {
      console.error(error);
    }
  };


  const mutation = useMutation({
    mutationFn: (newStory) => {
      return axios.post("/post/story", newStory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("storyContents");
    },
    onError: (error) => {
      console.error("게시 중 오류 발생", error);
    },
  });

  const handlePostStory = async () => {
    console.log("handlePostStory시작");
    if (storyImgUrl) {
      try {
        console.log("handlePostStory 실행중");
        const imgData = handleSubmitPostStoryImg();
        console.log(imgData, "imgData");
        mutation.mutateAsync({ content: content, url: imgData });
        setStoryModalOpen(!StoryModalOpen);
        setStoryImgUrl(null);
      } catch (error) {
        console.error(error);
      }
    }
    if (!storyImgUrl) alert("사진을 선택해주세요.");
  };*/

/*
  const { mutate } = useMutation(
    // 비동기 함수 정의
    async () => {
      if (storyImgUrl) {
        try {
          // 첫 번째 API 호출: 이미지 업로드
          const imgData = await axios.post("/post/storyimg", formData);

          // 두 번째 API 호출: 스토리 게시
          const response = await axios.post("/post/story", imgData);

          return response; // 성공 시 반환값
        } catch (error) {
          throw error; // 에러가 발생하면 해당 에러를 처리
        }
      }
    },
    {
      // 성공 시 실행되는 콜백 함수
      onSuccess: (data) => {
        console.log("게시 성공:", data);
        // 성공 후 추가 작업 수행 가능
      },
      // 에러 시 실행되는 콜백 함수
      onError: (error) => {
        console.error("게시 중 오류 발생:", error);
        // 에러 발생 후 추가 작업 수행 가능
      },
    }
  );

  // 클릭 시 mutation 실행
  const handleButtonClick = () => {
    mutate();
  };*/

/*
  return (
    <MakeStoryContentWrapper>
      <MakeStoryProfileWrapper>
        <MakeStoryProfileImg />
        <MakeStoryNickname></MakeStoryNickname>
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
            //handleButtonClick();
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
};*/

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
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const MakeStoryContentCp = () => {
  const [StoryModalOpen, setStoryModalOpen] = useRecoilState(
    ModalOpenAtom("makeStoryModal")
  );
  const [storyUpdate, setStoryUdate] = useRecoilState(stateUpdateAtom("story"));
  const [storyImgUrl, setStoryImgUrl] = useRecoilState(postImgAtom("storyImg"));

  const [content, setContent] = useState(null);

  const formData = new FormData();
  formData.append("img", storyImgUrl);

  const handleSubmitImg = async (formData) => {
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
    } catch (error) {
      console.error(error);
    }
  };
  /*
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
  };*/

  const handlePostStory = async () => {
    if (storyImgUrl) {
      try {
        const imgData = await handleSubmitImg(formData);
        const response = await handleSubmitStory(content, imgData);
        return response;
      } catch (error) {
        console.error("게시 중 오류 발생:", error);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: handlePostStory,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["storyContents"]);
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCreate = () => {
    mutate();
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
            handleCreate();
            //handlePostStory();
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
