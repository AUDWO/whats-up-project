import React, { useRef } from "react";
import {
  DiaryImgWrapper,
  DiaryImgForm,
  DiaryImgButtonWrapper,
  DiaryImgButton,
  DiaryImgInput,
  DiaryImgCancelButton,
  DiaryImg,
  DiaryImgDiv,
} from "../../StyledComponents/KeepDiaryStyle/DiaryImgSelect";
import { useRecoilState } from "recoil";
import imgUrlAtom from "../../store/imgUrlAtom";

const DiaryImgSelectComponent = () => {
  const [imgUrlData, setImgUrlData] = useRecoilState(imgUrlAtom("diaryImg"));

  const imgUrlRef = useRef();
  const imgPreviewRef = useRef();

  const onUpload = (e) => {
    e.preventDefault();
    const selectedImg = e.target.files[0];
    setImgUrlData(selectedImg);
  };

  return (
    <div>
      <DiaryImgForm>
        <DiaryImgButtonWrapper>
          <DiaryImgButton htmlFor="diaryImg">사진 선택</DiaryImgButton>
          <DiaryImgInput
            id="diaryImg"
            type="file"
            accept="image/*"
            name="diaryImg"
            onChange={onUpload}
          />
          <DiaryImgCancelButton
            onClick={() => {
              setImgUrlData("");
            }}
          >
            삭제하기
          </DiaryImgCancelButton>
        </DiaryImgButtonWrapper>
      </DiaryImgForm>

      <DiaryImgWrapper>
        <DiaryImgDiv>
          {imgUrlData && (
            <DiaryImg
              id="image-preview"
              src={URL.createObjectURL(imgUrlData)}
              alt="미리보기"
              ref={imgPreviewRef}
            />
          )}

          <input
            value=""
            type="hidden"
            name="url"
            ref={imgUrlRef}
            onChange={setImgUrlData}
          />
        </DiaryImgDiv>
      </DiaryImgWrapper>
    </div>
  );
};

export default DiaryImgSelectComponent;
