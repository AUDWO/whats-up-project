import React from "react";
import { useRecoilState } from "recoil";

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

function MakePostDragDownImgCp() {
  const [imgUrlData, setImgUrlData] = useRecoilState(imgUrlAtom("postImg"));

  //파일 선택 후 사진 고르는 함수
  function handleFileSelect(e) {
    e.preventDefault();
    const selectedImgUrl = e.target.files[0];
    if (selectedImgUrl && selectedImgUrl.type.startsWith("image/")) {
      setImgUrlData(selectedImgUrl);
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //사진을 drag-down형식으로 고르는 함수
  const handleDrop = (e) => {
    e.preventDefault();
    const selectedImgUrl = e.dataTransfer.files[0];
    if (selectedImgUrl && selectedImgUrl.type.startsWith("image/")) {
      setImgUrlData(selectedImgUrl);
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
            <DragDownImg
              src={URL.createObjectURL(imgUrlData)}
              alt="Dropped"
            ></DragDownImg>
            <DragDownImgCancelButton
              onClick={() => {
                setImgUrlData(null);
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
