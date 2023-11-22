import React from "react";
import { useRecoilState } from "recoil";

//Styled-Components
import {
  ToggleSwitch,
  ToggleSwitchWrapper,
  Checkbox,
  ToggleButton,
} from "../../StyledComponents/KeepDiaryStyle/ToggleSwitchButton";

//Atom
import toggleValueAtom from "../../store/ToggleValueAtom";

const ToggleSwitchButtonCp = ({ inputId, atomName }) => {
  const [toggleValue, setToggleValue] = useRecoilState(
    toggleValueAtom(atomName)
  );

  return (
    <ToggleSwitchWrapper>
      <Checkbox
        id={inputId}
        type="checkbox"
        hidden
        value={toggleValue}
        onChange={() => setToggleValue(!toggleValue)}
      />
      <ToggleSwitch htmlFor={inputId}>
        <ToggleButton></ToggleButton>
      </ToggleSwitch>
    </ToggleSwitchWrapper>
  );
};

export default ToggleSwitchButtonCp;
