import React from "react";
import { useRecoilValue } from "recoil";

//Styled-Components
import {
  DiaryAdvanceSetupWrapper,
  DiaryOptionImg,
  DiaryOptionPublic,
} from "../../StyledComponents/KeepDiaryStyle/DiaryOption";

//Components
import DiaryAdvancedSetupComponent from "./DiaryAdvancedSetupComponent";
import ToggleSwitchButtonCp from "./ToggleSwitchButton";
import DiaryImgSelectComponent from "./DiaryImgSelectComponent";

//Atoms
import toggleValueAtom from "../../store/ToggleValueAtom";

const DiaryOptionCp = () => {
  const toggleImgValue = useRecoilValue(toggleValueAtom("Img"));
  const togglePublicValue = useRecoilValue(toggleValueAtom("public"));

  return (
    <DiaryAdvanceSetupWrapper>
      <DiaryOptionImg>
        사진 업로드
        <ToggleSwitchButtonCp inputId={"toggleImg"} atomName={"Img"} />
      </DiaryOptionImg>
      {toggleImgValue && <DiaryImgSelectComponent />}
      <DiaryOptionPublic>
        공개
        <ToggleSwitchButtonCp inputId={"togglePublic"} atomName={"public"} />
      </DiaryOptionPublic>
      {togglePublicValue && <DiaryAdvancedSetupComponent />}
    </DiaryAdvanceSetupWrapper>
  );
};

export default DiaryOptionCp;
