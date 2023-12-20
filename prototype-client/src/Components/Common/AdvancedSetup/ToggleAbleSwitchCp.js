import React from "react";

import {
  AbleCheckbox,
  ToggleAbleButton,
  ToggleAbleSwitch,
} from "../../../StyledComponents/KeepDiaryStyle/ToggleAbleSwitchButton";

import { useRecoilState } from "recoil";
import toggleValueAtom from "../../../store/ToggleValueAtom";

const ToggleAbleSwitchCp = ({ inputId, atomName }) => {
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

export default ToggleAbleSwitchCp;
