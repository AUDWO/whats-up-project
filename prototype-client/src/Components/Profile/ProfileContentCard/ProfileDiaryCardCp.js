import React from "react";
import { useSetRecoilState } from "recoil";

//Styled-Components
import {
  StyledLink,
  ContentCardWrapper,
  ContentCard,
  ContentCardNoImg,
  ContentConfigIcon,
  DiaryPublicOffIcon,
  DiaryPublicOnIcon,
} from "../../../StyledComponents/ProfileStyle/ProfileContentsCpSt";

//Atoms
import contentInfoAtom from "../../../store/contentInfo/diaryContentInfoAtom";
import ModalOpenAtom from "../../../store/ModalOpenAtom";

const ProfileDiaryCardCp = ({ content, myCard }) => {
  const setContentInfo = useSetRecoilState(contentInfoAtom);
  const setContentConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileContentConfigModal")
  );
  return (
    <ContentCardWrapper>
      {content.img ? (
        <StyledLink to={`/more-diary/${content.id}`} key={content.id}>
          <ContentCard src={content.img} />
        </StyledLink>
      ) : (
        <StyledLink to={`/more-diary/${content.id}`} key={content.id}>
          <ContentCardNoImg>Diary</ContentCardNoImg>
        </StyledLink>
      )}

      <>
        {content.publicControl ? <DiaryPublicOnIcon /> : <DiaryPublicOffIcon />}
      </>
      {myCard && (
        <ContentConfigIcon
          onClick={() => {
            setContentConfigModalOpen(true);
            setContentInfo({ ...content, type: "diary" });
          }}
        />
      )}
    </ContentCardWrapper>
  );
};

export default ProfileDiaryCardCp;
