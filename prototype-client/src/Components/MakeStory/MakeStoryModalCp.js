import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";

//Styled-Components
import {
  MakeStoryWrapper,
  MakeStoryModal,
} from "../../StyledComponents/MakeStoryStyle/MakeStoryModalCpStyle";

//Components
import MakeStoryImgCp from "./MakeStoryImgCp";
import MakeStoryContentCp from "./MakeStoryContentCp";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";

const MakeStoryModalCp = () => {
  const setMakeStoryModalOpen = useSetRecoilState(
    ModalOpenAtom("makeStoryModal")
  );

  const storyModalBackground = useRef();
  return (
    <MakeStoryModal
      ref={storyModalBackground}
      onClick={(e) => {
        if (e.target === storyModalBackground.current) {
          setMakeStoryModalOpen(false);
        }
      }}
    >
      <MakeStoryWrapper>
        <MakeStoryImgCp />
        <MakeStoryContentCp />
      </MakeStoryWrapper>
    </MakeStoryModal>
  );
};

export default MakeStoryModalCp;

/*
  <MakeStoryWrapper>
        <MakeStoryImgCp />
        <MakeStoryContentCp />
      </MakeStoryWrapper>
    </MakeStoryModal>
*/
