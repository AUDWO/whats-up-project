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
import { useMutation } from "@tanstack/react-query";

function MakePostDragDownImgCp() {
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

  //파일 선택 후 사진 고르는 함수
  const handleFileSelect = async (e) => {
    e.preventDefault();
    const selectedImgUrl = e.target.files[0];
    if (selectedImgUrl && selectedImgUrl.type.startsWith("image/")) {
      formData.append("img", selectedImgUrl);
      const response = await handleSubmitPostImg(formData);
      setImgOriginalUrlData(response.data.originalUrl);
      setImgUrlData(response.data.url);
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
      const response = await handleSubmitPostImg(formData);
      setImgOriginalUrlData(response.data.originalUrl);
      setImgUrlData(response.data.url);
    }
  };

  return (
    <DragDownImgWrapper>
      <DragDownImgContentWrapper
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {imgUrlData ? (
          <ImgWrapper>
            <DragDownImg src={imgOriginalUrlData} alt="Dropped"></DragDownImg>
            <DragDownImgCancelButton
              onClick={() => {
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
      </DragDownImgContentWrapper>
    </DragDownImgWrapper>
  );
}

export default MakePostDragDownImgCp;
