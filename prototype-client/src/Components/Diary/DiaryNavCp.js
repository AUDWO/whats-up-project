import React from "react";
import { useRecoilState } from "recoil";

//Styled-Components
import {
  DiaryNavWrapper,
  DiaryNav,
  DiaryFilterOptionTitle,
  DiaryFilterOption,
  DiaryFilterWrapper,
  DiaryTrendIcon,
  DiaryLatestIcon,
  EmptySpace,
} from "../../StyledComponents/DiaryStyle/DiaryNavCpSt";

//Atom
import toggleValueAtom from "../../store/ToggleValueAtom";

const DiaryNavCp = () => {
  const [filterType, setFilterType] = useRecoilState(
    toggleValueAtom("filterType")
  );

  return (
    <DiaryNavWrapper>
      <EmptySpace></EmptySpace>
      <DiaryNav>
        <DiaryFilterWrapper>
          <DiaryFilterOption
            onClick={() => {
              setFilterType("latest");
            }}
          >
            <DiaryLatestIcon />
            <DiaryFilterOptionTitle type={"latest"} on={filterType}>
              최신
            </DiaryFilterOptionTitle>
          </DiaryFilterOption>
          <DiaryFilterOption
            onClick={() => {
              setFilterType("trend");
            }}
          >
            <DiaryTrendIcon />
            <DiaryFilterOptionTitle type={"trend"} on={filterType}>
              트렌딩
            </DiaryFilterOptionTitle>
          </DiaryFilterOption>
        </DiaryFilterWrapper>
      </DiaryNav>
    </DiaryNavWrapper>
  );
};

export default DiaryNavCp;
