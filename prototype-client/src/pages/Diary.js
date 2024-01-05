import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

//Components
import DiaryContentsCp from "../Components/Diary/DiaryContentsCp";
import DiaryNavCp from "../Components/Diary/DiaryNavCp";

//Styled-Component
import HomeWraper from "../StyledComponents/HomeStyle/HomeWrapper";
import { DiaryPageWrapper } from "../StyledComponents/DiaryStyle/Diary";

//Atom
import toggleValueAtom from "../store/ToggleValueAtom";

const Diary = () => {
  const [filterType, setFilterType] = useRecoilState(
    toggleValueAtom("filterType")
  );
  useEffect(() => {
    setFilterType("latest");
  }, []);

  console.log("useEffect");

  if (filterType === "latest" || filterType === "trend") {
    return (
      <HomeWraper>
        <DiaryPageWrapper>
          <DiaryNavCp />
          <DiaryContentsCp filterType={filterType} />
        </DiaryPageWrapper>
      </HomeWraper>
    );
  }
};

export default Diary;
