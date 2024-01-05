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
import axios from "axios";

const DiaryImgSelectComponent = () => {
  const [imgUrlData, setImgUrlData] = useRecoilState(imgUrlAtom("diaryImgUrl"));
  const [imgOriginalUrlData, setImgOriginalUrlData] = useRecoilState(
    imgUrlAtom("diaryImgOriginalUrl")
  );

  const imgUrlRef = useRef();
  const imgPreviewRef = useRef();

  const formData = new FormData();

  const handleSubmitPostImg = async (formData) => {
    try {
      return await axios.post("/post/diaryimg", formData);
    } catch (error) {
      console.error(error, "handleSubmitPostImg -ERROR");
    }
  };

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
            onChange={handleFileSelect}
          />
          <DiaryImgCancelButton
            onClick={() => {
              setImgOriginalUrlData("");
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
              src={imgOriginalUrlData}
              alt="미리보기"
              ref={imgPreviewRef}
            />
          )}

          <input
            value=""
            type="hidden"
            name="url"
            ref={imgUrlRef}
            onChange={handleFileSelect}
          />
        </DiaryImgDiv>
      </DiaryImgWrapper>
    </div>
  );
};

export default DiaryImgSelectComponent;
