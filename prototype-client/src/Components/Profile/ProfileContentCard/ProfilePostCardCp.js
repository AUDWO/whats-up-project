import React from "react";
import { useSetRecoilState } from "recoil";

//Styled-Components
import {
  ContentCardWrapper,
  ContentCard,
  ContentConfigIcon,
} from "../../../StyledComponents/ProfileStyle/ProfileContentsCpSt";

//Atoms
import contentInfoAtom from "../../../store/contentInfo/diaryContentInfoAtom";
import ModalOpenAtom from "../../../store/ModalOpenAtom";

const ProfilePostCardCp = ({ content, myCard }) => {
  const setContentConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileContentConfigModal")
  );
  const setContentInfo = useSetRecoilState(contentInfoAtom);

  return (
    <ContentCardWrapper>
      <ContentCard src={content.img} />
      {myCard && (
        <ContentConfigIcon
          onClick={() => {
            setContentConfigModalOpen(true);
            setContentInfo({ ...content, type: "post" });
          }}
        />
      )}
    </ContentCardWrapper>
  );
};

export default ProfilePostCardCp;
