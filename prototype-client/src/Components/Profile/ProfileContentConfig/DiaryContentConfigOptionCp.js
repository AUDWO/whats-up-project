import React, { useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";

//Styled-Components
import {
  ConfigWrapper,
  ConfigOptionTitle,
  ConfigOptionWrapper,
  ToggleSwitchWrapper,
  ToggleValueTitle,
  Toggle,
  ToggleSwitch,
  ToggleButton,
  PostButton,
  PostButtonWrapper,
} from "../../../StyledComponents/ProfileStyle/ProfileContentConfig/DiaryContentConfigOption";

//Atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import toggleValueAtom from "../../../store/ToggleValueAtom";
import stateUpdateAtom from "../../../store/stateUpdateAtom";

const DiaryContentConfigOptionCp = ({ contentInfo }) => {
  const [togglePublicValue, setTogglePublicValue] = useState(
    contentInfo.publicControl
  );
  const [toggleLikeValue, setToggleLikeValue] = useState(
    contentInfo.likeControl
  );
  const [toggleCommentValue, setToggleCommentValue] = useState(
    contentInfo.commentControl
  );

  const setContentConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileContentConfigModal")
  );
  const setDiaryContentsOpen = useRecoilState(
    toggleValueAtom("diaryContentsOpen")
  );
  const [contentUpdate, setContentUpdate] = useRecoilState(
    stateUpdateAtom("contentUpdate")
  );

  const handleChangeDiaryInfo = async () => {
    try {
      const response = await axios.patch(
        `/update/diary-info/${contentInfo.id}`,
        {
          publicControl: togglePublicValue,
          likeControl: toggleLikeValue,
          commentControl: toggleCommentValue,
        }
      );

      setContentConfigModalOpen(false);
      setContentUpdate(!contentUpdate);
      setDiaryContentsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ConfigWrapper>
      <ConfigOptionWrapper height={"auto"} flexD={"column"}>
        <ConfigOptionTitle marginT={"15"}>공개 여부</ConfigOptionTitle>
        <ToggleSwitchWrapper>
          <ToggleValueTitle>OFF</ToggleValueTitle>
          <Toggle
            id="togglePublic"
            type="checkbox"
            hidden
            checked={togglePublicValue}
            onChange={() => setTogglePublicValue(!togglePublicValue)}
          />
          <ToggleSwitch htmlFor="togglePublic">
            <ToggleButton></ToggleButton>
          </ToggleSwitch>
          {togglePublicValue ? (
            <ToggleValueTitle color={"#f7dd07"}>ON</ToggleValueTitle>
          ) : (
            <ToggleValueTitle>ON</ToggleValueTitle>
          )}{" "}
        </ToggleSwitchWrapper>
      </ConfigOptionWrapper>

      {togglePublicValue && (
        <>
          <ConfigOptionWrapper height={"auto"} flexD={"column"}>
            <ConfigOptionTitle marginT={"10"}>댓글 기능</ConfigOptionTitle>
            <ToggleSwitchWrapper>
              <ToggleValueTitle>OFF</ToggleValueTitle>
              <Toggle
                id="toggleComment"
                type="checkbox"
                hidden
                checked={toggleCommentValue}
                onChange={() => setToggleCommentValue(!toggleCommentValue)}
              />
              <ToggleSwitch htmlFor="toggleComment">
                <ToggleButton></ToggleButton>
              </ToggleSwitch>
              {toggleCommentValue ? (
                <ToggleValueTitle color={"#f7dd07"}>ON</ToggleValueTitle>
              ) : (
                <ToggleValueTitle>ON</ToggleValueTitle>
              )}
            </ToggleSwitchWrapper>
          </ConfigOptionWrapper>
          <ConfigOptionWrapper height={"auto"} flexD={"column"}>
            <ConfigOptionTitle marginT={"15"}>좋아요 기능</ConfigOptionTitle>
            <ToggleSwitchWrapper>
              <ToggleValueTitle>OFF</ToggleValueTitle>
              <Toggle
                id="toggleLike"
                type="checkbox"
                hidden
                checked={toggleLikeValue}
                onChange={() => setToggleLikeValue(!toggleLikeValue)}
              />
              <ToggleSwitch htmlFor="toggleLike">
                <ToggleButton></ToggleButton>
              </ToggleSwitch>
              {toggleLikeValue ? (
                <ToggleValueTitle color={"#f7dd07"}>ON</ToggleValueTitle>
              ) : (
                <ToggleValueTitle>ON</ToggleValueTitle>
              )}
            </ToggleSwitchWrapper>
          </ConfigOptionWrapper>
        </>
      )}
      <PostButtonWrapper>
        <PostButton
          onClick={() => {
            handleChangeDiaryInfo();
          }}
        >
          저장하기
        </PostButton>
      </PostButtonWrapper>
    </ConfigWrapper>
  );
};

export default DiaryContentConfigOptionCp;

//--
