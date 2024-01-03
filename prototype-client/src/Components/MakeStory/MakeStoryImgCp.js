import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

//Styled-Component
import {
  MakeStoryImg,
  MakeStoryImgFormWrapper,
  MakeStoryImgInput,
  MakeStoryImgWrapper,
  MakeStoryImgSelectWrapper,
  MakeStoryImgSelectButton,
} from "../../StyledComponents/MakeStoryStyle/MakeStoryImgStyle";

//Atom
import postImgAtom from "../../store/PostImgAtom";

import axios from "axios";

const MakeStoryImgCp = () => {
  const [imgUrlData, setImgUrlData] = useRecoilState(
    postImgAtom("storyImgUrl")
  );
  const [imgOriginalUrlData, setImgOriginalUrlData] = useRecoilState(
    postImgAtom("storyImgOriginalUrl")
  );

  const formData = new FormData();

  const handleSubmitPostImg = async (formData) => {
    try {
      const imgDataResponse = await axios.post("/post/storyimg", formData);
      return imgDataResponse;
    } catch (error) {
      console.error(error);
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
    <MakeStoryImgWrapper>
      <MakeStoryImgSelectWrapper>
        <MakeStoryImgFormWrapper>
          <MakeStoryImgSelectButton htmlFor="storyImg">
            사진 선택하기
          </MakeStoryImgSelectButton>
          <MakeStoryImgInput
            id="storyImg"
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileSelect}
          />
        </MakeStoryImgFormWrapper>
      </MakeStoryImgSelectWrapper>
      {imgUrlData && <MakeStoryImg src={imgOriginalUrlData} />}
    </MakeStoryImgWrapper>
  );
};

export default MakeStoryImgCp;
