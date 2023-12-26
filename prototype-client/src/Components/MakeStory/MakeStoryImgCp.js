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

const MakeStoryImgCp = () => {
  const [imgUrlData, setImgUrlData] = useRecoilState(postImgAtom("storyImg"));

  function handleImgSelect(e) {
    e.preventDefault();
    const selectedImg = e.target.files[0];
    if (selectedImg && selectedImg.type.startsWith("image/")) {
      setImgUrlData(selectedImg);
    }
  }

  useEffect(() => {
    return () => {
      setImgUrlData("");
    };
  });

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
            onChange={handleImgSelect}
          />
        </MakeStoryImgFormWrapper>
      </MakeStoryImgSelectWrapper>
      {imgUrlData && <MakeStoryImg src={URL.createObjectURL(imgUrlData)} />}
    </MakeStoryImgWrapper>
  );
};

export default MakeStoryImgCp;
