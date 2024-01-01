import React from "react";
import { useRecoilState } from "recoil";

//Styled-Components"
import {
  AbleCheckbox,
  ToggleAbleButton,
  ToggleAbleSwitch,
} from "../../StyledComponents/KeepDiaryStyle/ToggleAbleSwitchButton";

//Atom
import toggleValueAtom from "../../store/ToggleValueAtom";

const ToggleAbleSwitchComponent = ({ inputId, atomName }) => {
  const [toggleValue, setToggleValue] = useRecoilState(
    toggleValueAtom(`${atomName}`)
  );

  return (
    <>
      <AbleCheckbox
        id={inputId}
        type="checkbox"
        hidden
        checked={toggleValue}
        onChange={() => setToggleValue(!toggleValue)}
      />
      <ToggleAbleSwitch htmlFor={inputId}>
        <ToggleAbleButton></ToggleAbleButton>
      </ToggleAbleSwitch>
    </>
  );
};

export default ToggleAbleSwitchComponent;
