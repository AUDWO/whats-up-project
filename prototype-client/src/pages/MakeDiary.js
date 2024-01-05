import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

//Styled-Component
import HomeWraper from "../StyledComponents/HomeStyle/HomeWrapper";

import {
  DiaryTextarea,
  DiaryContentText,
  PostDiaryButton,
  PostDiaryButtonForm,
  DiaryTextareaWrapper,
  DiaryOptionWrapper,
  KeepDiaryTitle,
  DeleteDiaryButton,
} from "../StyledComponents/KeepDiaryStyle/KeepDiary";

//Component
import DiaryOptionCp from "../Components/WriteDiary/DiaryOptionCp";

//Atoms
import toggleValueAtom from "../store/ToggleValueAtom";
import imgUrlAtom from "../store/imgUrlAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MakeDiary = () => {
  useEffect(() => {
    handleDiaryOptionReset();
  }, []);

  const navigate = useNavigate();
  const likeControl = useRecoilValue(toggleValueAtom("diaryReact"));
  const commentControl = useRecoilValue(toggleValueAtom("diaryComment"));
  const publicControl = useRecoilValue(toggleValueAtom("public"));
  const [imgUrlData, setImgUrlData] = useRecoilState(imgUrlAtom("diaryImgUrl"));

  //다른 페이지에 나갔다가 다시 들어오면 설정값을 초기화시키기 위해 필요한 토글 값들
  const [toggleImgValue, setToggleImgValue] = useRecoilState(
    toggleValueAtom("Img")
  );
  const setTogglePublicValue = useSetRecoilState(toggleValueAtom("public"));
  const setToggleDiaryReactControl = useSetRecoilState(
    toggleValueAtom("diaryReact")
  );
  const setToggleDiaryCommentControl = useSetRecoilState(
    toggleValueAtom("diaryComment")
  );
  //-------------------

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const formData = new FormData();
  if (imgUrlAtom) {
    formData.append("img", imgUrlData);
  }

  const handleDiaryOptionReset = () => {
    setToggleImgValue(false);
    setTogglePublicValue(false);
    setToggleDiaryCommentControl(false);
    setToggleDiaryReactControl(false);
  };

  const handleReset = () => {
    setImgUrlData(false);
    setToggleImgValue(false);
    setTogglePublicValue(false);
  };

  //일기를 쓰기 위해 확인해야할 조건들 (모든 조건들을 만족하면 handlePostDiary가 실행됨)
  const handleWritingDiaryCheck = async () => {
    if (content.length < 1) {
      alert("내용을 작성해주세요!");
      return;
    }
    if (title.length < 1) {
      alert("제목을 작성해주세요!");
      return;
    }

    if (toggleImgValue) {
      if (!imgUrlData) {
        alert("사진을 선택해주세요.");
        return;
      }
    }
    mutate();
  };

  const createDiary = async () => {
    try {
      //사진을 선택한 경우
      if (imgUrlData) {
        if (publicControl) {
          const postResponse = await axios.post("/post/diary", {
            url: imgUrlData,
            likeControl: !likeControl,
            commentControl: !commentControl,
            publicControl: publicControl,
            content: content,
            title: title,
          });
          return postResponse;
        }

        if (!publicControl) {
          const postResponse = await axios.post("/post/diary", {
            url: imgUrlData,
            likeControl: likeControl,
            commentControl: commentControl,
            publicControl: publicControl,
            content: content,
            title: title,
          });
          return postResponse;
        }
      }
      //사진을 선택하지 않은 경우
      if (!imgUrlData) {
        if (publicControl) {
          const postResponse = await axios.post("/post/diary", {
            likeControl: !likeControl,
            commentControl: !commentControl,
            publicControl: publicControl,
            content: content,
            title: title,
          });

          return postResponse;
        }

        if (!publicControl) {
          const postResponse = await axios.post("/post/diary", {
            likeControl: likeControl,
            commentControl: commentControl,
            publicControl: publicControl,
            content: content,
            title: title,
          });
          return postResponse;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["diaryContentsInfo"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myUserInfo"],
      });
      if (publicControl) {
        navigate("/dashboard/diary");
      }
      if (!publicControl) {
        navigate("/dashboard/profile");
      }
      handleReset();
    },
  });

  return (
    <HomeWraper>
      <DiaryOptionWrapper>
        <KeepDiaryTitle
          placeholder="제목을 입력해주세요..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <DiaryOptionCp />
      </DiaryOptionWrapper>
      <DiaryTextareaWrapper>
        <DiaryContentText>내용</DiaryContentText>
        <DiaryTextarea
          name="content"
          value={content}
          placeholder="당신의 이야기를 들려주세요."
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></DiaryTextarea>
        <PostDiaryButtonForm>
          <PostDiaryButton
            onClick={(e) => {
              e.preventDefault();
              handleWritingDiaryCheck();
            }}
          >
            일기쓰기
          </PostDiaryButton>
          <DeleteDiaryButton>삭제하기</DeleteDiaryButton>
        </PostDiaryButtonForm>
      </DiaryTextareaWrapper>
    </HomeWraper>
  );
};

export default MakeDiary;
