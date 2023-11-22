import React from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

//Styled-Component
import {
  NoContentPage,
  NoContentWrapper,
  NoContent,
  NoContentTitle,
  MakeContentButton,
  MakeIcon,
} from "../../StyledComponents/ProfileStyle/NoPostContentCpSt";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";
const NoPostContentCp = ({ title, content, subtitle, type }) => {
  const setProfileConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("makePostModal")
  );

  const navigate = useNavigate();

  const handleOpenMakeModal = () => {
    if (type === "post") {
      setProfileConfigModalOpen(true);
    }
    if (type === "diary") {
      navigate("/dashboard/make-diary");
    }
  };

  return (
    <NoContentPage>
      <NoContentWrapper>
        {!(type === "otherUser") && <MakeIcon onClick={handleOpenMakeModal} />}
        <NoContentTitle>{title}</NoContentTitle>
        <NoContent>{content}</NoContent>
        <MakeContentButton>{subtitle}</MakeContentButton>
      </NoContentWrapper>
    </NoContentPage>
  );
};

export default NoPostContentCp;
