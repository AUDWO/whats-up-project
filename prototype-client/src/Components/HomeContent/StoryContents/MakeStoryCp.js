import React from "react";

//Styled-Components
import {
  MakeStoryContent,
  StoryProfile,
  MakeStoryProfileImg,
  PlusIcon,
  StoryProfileName,
} from "../../../StyledComponents/HomeContentStyle/StoryContentsCpSt";
import { useSetRecoilState } from "recoil";
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import UserInfoQuery from "../../../customHooks/userInfoQuery";

const MakeStoryCp = () => {
  const setStoryModalOpen = useSetRecoilState(ModalOpenAtom("makeStoryModal"));
  const setLoginRequestMdOpen = useSetRecoilState(
    ModalOpenAtom("loginRequestMd")
  );
  const userInfo = UserInfoQuery();
  return (
    <MakeStoryContent
      onClick={() => {
        if (userInfo.loginCheck) {
          setStoryModalOpen(true);
        } else {
          setLoginRequestMdOpen(true);
        }
      }}
    >
      <StoryProfile>
        <MakeStoryProfileImg>
          <PlusIcon />
        </MakeStoryProfileImg>
        <StoryProfileName>Make story</StoryProfileName>
      </StoryProfile>
    </MakeStoryContent>
  );
};

export default MakeStoryCp;
