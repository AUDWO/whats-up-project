import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

//Styled-Components
import {
  ProfileConfigModalWrapper,
  ProfileConfigWrapper,
  ProfileConfigListItem,
  ConfigTitleWrapper,
  ConfigTitle,
} from "../../StyledComponents/ProfileStyle/ProfileContentConfig/ProfileContentConfigModalCpSt";

//Components
import PostContentConfigOptionCp from "./ProfileContentConfig/PostContentConfigOptionCp";
import DiaryContentConfigOptionCp from "./ProfileContentConfig/DiaryContentConfigOptionCp";

//Atoms
import contentInfoAtom from "../../store/contentInfo/diaryContentInfoAtom";
import stateUpdateAtom from "../../store/stateUpdateAtom";
import ModalOpenAtom from "../../store/ModalOpenAtom";

const ProfileContentConfigModalCp = () => {
  const profileContentConfigModalBackground = useRef();
  const setContentConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileContentConfigModal")
  );

  const [contentUpdate, setContentUpdate] = useRecoilState(
    stateUpdateAtom("contentUpdate")
  );

  const [diaryInfoOpen, setDiaryInfoOpen] = useState(false);
  const [postInfoOpen, setPostInfoOpen] = useState(false);

  const contentInfo = useRecoilValue(contentInfoAtom);

  useEffect(() => {
    if (contentInfo.type === "diary") {
      setDiaryInfoOpen(true);
    }

    if (contentInfo.type === "post") {
      setPostInfoOpen(true);
    }
  }, []);

  const handleDelete = async () => {
    if (diaryInfoOpen) {
      const response = await axios.delete(`/delete/diary/${contentInfo.id}`);
    }

    if (postInfoOpen) {
      const response = await axios.delete(`/delete/post/${contentInfo.id}`);
      setContentConfigModalOpen(false);
    }
    setContentConfigModalOpen(false);
    setContentUpdate(!contentUpdate);
  };

  if (diaryInfoOpen || postInfoOpen) {
    return (
      <ProfileConfigModalWrapper
        ref={profileContentConfigModalBackground}
        onClick={(e) => {
          if (e.target === profileContentConfigModalBackground.current) {
            setContentConfigModalOpen(false);
          }
        }}
      >
        <ProfileConfigWrapper>
          <ProfileConfigListItem>
            <ConfigTitleWrapper>
              <ConfigTitle>
                {diaryInfoOpen && "일기 정보 변경"}
                {postInfoOpen && "게시물 정보 변경"}
              </ConfigTitle>
            </ConfigTitleWrapper>
            {diaryInfoOpen && (
              <DiaryContentConfigOptionCp contentInfo={contentInfo} />
            )}
            {postInfoOpen && (
              <PostContentConfigOptionCp contentInfo={contentInfo} />
            )}
          </ProfileConfigListItem>
          <ProfileConfigListItem>
            <ConfigTitleWrapper>
              <ConfigTitle
                color={"red"}
                onClick={() => {
                  handleDelete();
                }}
              >
                {diaryInfoOpen && "일기 삭제"}
                {postInfoOpen && "게시물 삭제"}
              </ConfigTitle>
            </ConfigTitleWrapper>
          </ProfileConfigListItem>
          <ProfileConfigListItem>
            <ConfigTitleWrapper
              onClick={() => {
                setContentConfigModalOpen(false);
              }}
            >
              <ConfigTitle>닫기</ConfigTitle>
            </ConfigTitleWrapper>
          </ProfileConfigListItem>
        </ProfileConfigWrapper>
      </ProfileConfigModalWrapper>
    );
  }
};

export default ProfileContentConfigModalCp;
