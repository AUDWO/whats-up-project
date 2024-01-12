import React from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

//Styled-Component
import {
  DragDownImg,
  DragDownImgWrapper,
  DragDownImgContentWrapper,
  ImgWrapper,
  DragDownImgCancelButton,
  DragDownImgSignWrapper,
  DragDownImgSign,
  MakeStoryImgFormWrapper,
  MakeStoryImgSelectButton,
  MakeStoryImgInput,
} from "../../StyledComponents/MakePostStyle/MakePostDragDownImgCpSt";

//Atom
import imgUrlAtom from "../../store/imgUrlAtom";

import CustomUseMutation from "../../customHooks/CustomUseMutation";

import SpinnerCp from "../Common/Spinner/SpinnerCp";

function MakePostImgCp() {
  const [imgUrlData, setImgUrlData] = useRecoilState(imgUrlAtom("postImgUrl"));
  const [imgOriginalUrlData, setImgOriginalUrlData] = useRecoilState(
    imgUrlAtom("postImgOriginalUrl")
  );
  const formData = new FormData();

  const handleSubmitPostImg = async (formData) => {
    try {
      const imgDataResponse = await axios.post("/post/img", formData);
      console.log(imgDataResponse, "imgDataResponse");

      return imgDataResponse;
    } catch (error) {
      console.error(error);
    }
  };

  const createPostImg = async () => {
    try {
      return await axios.post("/post/img", formData);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate, isPending } = CustomUseMutation(createPostImg, [], (data) => {
    setImgOriginalUrlData(data.data.originalUrl);
    setImgUrlData(data.data.url);
  });

  console.log(isPending, "isPending isPending isPending isPending");

  //파일 선택 후 사진 고르는 함수
  const handleFileSelect = async (e) => {
    e.preventDefault();
    const selectedImgUrl = e.target.files[0];
    if (selectedImgUrl && selectedImgUrl.type.startsWith("image/")) {
      formData.append("img", selectedImgUrl);
      mutate();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //사진을 drag-down형식으로 고르는 함수
  const handleDrop = async (e) => {
    e.preventDefault();
    const selectedImgUrl = e.dataTransfer.files[0];
    if (selectedImgUrl && selectedImgUrl.type.startsWith("image/")) {
      formData.append("img", selectedImgUrl);
      mutate();
    }
  };

  return (
    <DragDownImgWrapper>
      <DragDownImgContentWrapper
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {imgOriginalUrlData && (
          <ImgWrapper>
            <DragDownImg src={imgOriginalUrlData} alt="Dropped"></DragDownImg>
            <DragDownImgCancelButton
              onClick={() => {
                setImgUrlData(null);
                setImgOriginalUrlData(null);
              }}
            />
          </ImgWrapper>
        )}
        {!imgOriginalUrlData && !isPending && (
          <DragDownImgSignWrapper>
            <DragDownImgSign>이미지를 드래그하여 업로드하세요</DragDownImgSign>
            <MakeStoryImgFormWrapper>
              <MakeStoryImgSelectButton htmlFor="postImg">
                사진 선택하기
              </MakeStoryImgSelectButton>
              <MakeStoryImgInput
                id="postImg"
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileSelect}
              />
            </MakeStoryImgFormWrapper>
          </DragDownImgSignWrapper>
        )}
        {isPending && <SpinnerCp color="#f7dd07" size="60px" />}
      </DragDownImgContentWrapper>
    </DragDownImgWrapper>
  );
}

export default MakePostImgCp;

/*

 {imgOriginalUrlData ? (
          <ImgWrapper>
            <DragDownImg src={imgOriginalUrlData} alt="Dropped"></DragDownImg>
            <DragDownImgCancelButton
              onClick={() => {
                setImgUrlData(null);
                setImgOriginalUrlData(null);
              }}
            />
          </ImgWrapper>
        ) : (
          <DragDownImgSignWrapper>
            <DragDownImgSign>이미지를 드래그하여 업로드하세요</DragDownImgSign>
            <MakeStoryImgFormWrapper>
              <MakeStoryImgSelectButton htmlFor="postImg">
                사진 선택하기
              </MakeStoryImgSelectButton>
              <MakeStoryImgInput
                id="postImg"
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileSelect}
              />
            </MakeStoryImgFormWrapper>
          </DragDownImgSignWrapper>
        )}




*/
