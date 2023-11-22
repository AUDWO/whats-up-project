import styled from "styled-components";

export const DiaryOptionWrapper = styled.div`
  padding: 30px;
  height: 1100px;
`;

export const DiaryTextareaWrapper = styled.div`
  padding: 30px;
`;

export const DiaryImgInput = styled.input`
  display: none;
`;

export const DiaryImgForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

export const KeepDiaryTitle = styled.input`
  font-size: 40px;
  font-weight: 700;
  width: 500px;
  height: 70px;
  border: none;
`;

export const DiaryImgButtonWrapper = styled.div`
  display: flex;
`;

export const DiaryImgCancelButton = styled.div`
  width: 100px;
  height: 40px;
  text-align: center;
  padding: 10px;
  border-radius: 7px;
  color: #858e96;
  margin-right: 40px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    color: #f7dd07;
  }
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

export const DiaryImgButton = styled.label`
  width: 100px;
  height: 40px;
  text-align: center;
  padding: 10px;
  border-radius: 7px;
  color: #858e96;
  margin-right: 40px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    color: #f7dd07;
  }
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

export const DiaryImgWrapper = styled.div`
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 350px;
`;

export const DiaryTextarea = styled.textarea`
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 600px;
  padding: 20px;
  font-size: 25px;
  border: none;
  outline: none;
`;

export const DiaryContentText = styled.div`
  font-size: 40px;
  color: #757575;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const ToggleButton = styled.span`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #555555;
  transition: all 0.2s ease-in;
`;

export const ToggleSwitch = styled.label`
  width: 64px;
  height: 32px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin: 30px;
  transition: all 0.2s ease-in;

  border: 3px solid #555555;
`;

export const Checkbox = styled.input`
  &:checked + ${ToggleSwitch} {
    border: 3px solid #f7dd07;
    ${ToggleButton} {
      left: calc(100% - 25px);
      background-color: #f7dd07;
    }
  }
`;

export const ToggleSwitchComponent = () => {
  return (
    <>
      <Checkbox id="toggleImg" type="checkbox" hidden />
      <ToggleSwitch htmlFor="toggleImg">
        <ToggleButton></ToggleButton>
      </ToggleSwitch>
    </>
  );
};
export const ToggleSwitchComponent2 = ({ value }) => {
  return (
    <>
      <Checkbox id="togglePublic" type="checkbox" hidden value={value} />
      <ToggleSwitch htmlFor="togglePublic">
        <ToggleButton></ToggleButton>
      </ToggleSwitch>
    </>
  );
};

export const ToggleSwitchWrapper = styled.div``;

export const Ooption = styled.div`
  width: 350px;
  height: 210px;
  margin-bottom: 100px;
  padding: 10px 5px 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

//

export const LikeCountAbleButtonTitle = styled.div``;

export const HitsAbleButtonTitle = styled.div``;

export const CommentsAbleButtonTtile = styled.div``;

export const ToggleSwitchFunctionButton = () => {
  return (
    <>
      <Checkbox id="toggleImg" type="checkbox" hidden />
      <ToggleSwitch htmlFor="toggleImg">
        <ToggleButton></ToggleButton>
      </ToggleSwitch>
    </>
  );
};

export const ToggleAbleSwitch = styled.label`
  width: 64px;
  height: 3px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: #bbbbbb;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin: 30px;
  transition: all 0.2s ease-in;
`;

export const ToggleAbleButton = styled.span`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 0.1px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #bbbbbb;
  transition: all 0.2s ease-in;
`;
const AbleCheckbox = styled.input`
  &:checked + ${ToggleAbleSwitch} {
    background-color: #f7dd07;
    ${ToggleAbleButton} {
      left: calc(100% - 20px);
      background-color: #f7dd07;
    }
  }
`;

export const ToggleFunctionSwitchComponent = ({ inputId }) => {
  return (
    <>
      <AbleCheckbox id={inputId} type="checkbox" hidden />
      <ToggleAbleSwitch htmlFor={inputId}>
        <ToggleAbleButton></ToggleAbleButton>
      </ToggleAbleSwitch>
    </>
  );
};

export const ToggleAbleButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PostDiaryButtonForm = styled.form`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

export const PostDiaryButton = styled.button`
  width: 100px;
  height: 40px;
  color: #858e96;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #14b885;
    color: white;
  }
`;

export const DeleteDiaryButton = styled.button`
  width: 100px;
  height: 40px;
  color: #858e96;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #ed203d;
    color: white;
  }
`;
