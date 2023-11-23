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
import DiaryOptionCp from "../Components/KeepDiary/DiaryOptionCp";

//Atoms
import toggleValueAtom from "../store/ToggleValueAtom";
import imgUrlAtom from "../store/imgUrlAtom";
import userInfoAtom from "../store/userState/userAtom";
import stateUpdateAtom from "../store/stateUpdateAtom";

const MakeDiary = () => {
  useEffect(() => {
    handleDiaryOptionReset();
  }, []);

  const navigate = useNavigate();
  const likeControl = useRecoilValue(toggleValueAtom("diaryReact"));
  const commentControl = useRecoilValue(toggleValueAtom("diaryComment"));
  const publicControl = useRecoilValue(toggleValueAtom("public"));
  const [imgUrlData, setImgUrlData] = useRecoilState(imgUrlAtom("diaryImg"));

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

  const [userInfoUpdate, setUserInfoUpdate] = useRecoilState(
    stateUpdateAtom("userInfo")
  );
  const [contentUpdate, setContentUpdate] = useRecoilState(
    stateUpdateAtom("diary")
  );

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
  const handleCheck = () => {
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
    handlePostDiary();
  };

  /*
  const handleImageError = (event) => {
    event.target.src = event.target.src.replace(/\/thumb\//, '/original/');
  };*/

  const handlePostDiary = async () => {
    try {
      //사진을 선택한 경우
      if (imgUrlData) {
        const imgDataResponse = await axios.post("/post/diaryimg", formData);

        console.log("imgDataResponse");
        console.log(imgDataResponse);
        console.log("imgDataResponse");

        if (publicControl) {
          const postResponse = await axios.post("/post/diary", {
            url: imgDataResponse.data.url,
            likeControl: !likeControl,
            commentControl: !commentControl,
            publicControl: publicControl,
            content: content,
            title: title,
          });
        }

        if (!publicControl) {
          const postResponse = await axios.post("/post/diary", {
            url: imgDataResponse.data.url,
            likeControl: likeControl,
            commentControl: commentControl,
            publicControl: publicControl,
            content: content,
            title: title,
          });
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
        }

        if (!publicControl) {
          const postResponse = await axios.post("/post/diary", {
            likeControl: likeControl,
            commentControl: commentControl,
            publicControl: publicControl,
            content: content,
            title: title,
          });
        }
      }
      setContentUpdate(!contentUpdate);
      setUserInfoUpdate(!userInfoUpdate);
      if (publicControl) {
        navigate("/dashboard/diary");
      }
      if (!publicControl) {
        navigate("/dashboard/profile");
      }
      handleReset();
    } catch (error) {
      console.error(error);
    }
  };

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
              handleCheck();
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
