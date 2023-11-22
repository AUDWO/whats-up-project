import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";

//Styled-Components
import {
  ProfileConfigModalWrapper,
  ProfileConfigWrapper,
  ProfileConfigListItem,
  ConfigTitleWrapper,
  ConfigTitle,
  OpenIcon,
  CloseIcon,
} from "../../StyledComponents/ProfileStyle/ProfileConfigModalCpSt";

//Components
import ProfileInfoSettingOptionCp from "./ProfileConfigOptions/ProfileInfoSettingOptionCp";
import ProfileInfoOptionCp from "./ProfileConfigOptions/ProfileInfoOptionCp";
import ProfilePasswordOptionCp from "./ProfileConfigOptions/ProfilePasswordOptionCp";

//Atoms
import userInfoAtom from "../../store/userState/userAtom";
import ModalOpenAtom from "../../store/ModalOpenAtom";

const ProfileConfigModal = () => {
  const profileConfigModalBackground = useRef();

  const userInfo = useRecoilValue(userInfoAtom);
  const setConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileConfigModal")
  );

  const [profileSettingOption, setProfileSettingOption] = useState(false);
  const [passwordOption, setPasswordOption] = useState(false);
  const [userInfoOption, setUserInfoOption] = useState(false);

  return (
    <ProfileConfigModalWrapper
      ref={profileConfigModalBackground}
      onClick={(e) => {
        if (e.target === profileConfigModalBackground.current) {
          setConfigModalOpen(false);
        }
      }}
    >
      <ProfileConfigWrapper>
        <ProfileConfigListItem>
          <ConfigTitleWrapper>
            <ConfigTitle>프로필 설정</ConfigTitle>
            {profileSettingOption ? (
              <CloseIcon
                onClick={() => {
                  setProfileSettingOption(!profileSettingOption);
                }}
              />
            ) : (
              <OpenIcon
                onClick={() => {
                  setProfileSettingOption(!profileSettingOption);
                  setPasswordOption(false);
                  setUserInfoOption(false);
                }}
              />
            )}
          </ConfigTitleWrapper>
          {profileSettingOption && (
            <ProfileInfoSettingOptionCp userInfo={userInfo} />
          )}
        </ProfileConfigListItem>
        <ProfileConfigListItem>
          <ConfigTitleWrapper>
            <ConfigTitle>비밀번호 변경</ConfigTitle>
            {passwordOption ? (
              <CloseIcon
                onClick={() => {
                  setPasswordOption(!passwordOption);
                }}
              />
            ) : (
              <OpenIcon
                onClick={() => {
                  setPasswordOption(!passwordOption);
                  setUserInfoOption(false);
                  setProfileSettingOption(false);
                }}
              />
            )}
          </ConfigTitleWrapper>
          {passwordOption && <ProfilePasswordOptionCp />}
        </ProfileConfigListItem>
        <ProfileConfigListItem>
          <ConfigTitleWrapper>
            <ConfigTitle>개인정보</ConfigTitle>
            {userInfoOption ? (
              <CloseIcon
                onClick={() => {
                  setUserInfoOption(!userInfoOption);
                }}
              />
            ) : (
              <OpenIcon
                onClick={() => {
                  setUserInfoOption(!userInfoOption);
                  setPasswordOption(false);
                  setProfileSettingOption(false);
                }}
              />
            )}
          </ConfigTitleWrapper>
          {userInfoOption && <ProfileInfoOptionCp userEmail={userInfo.email} />}
        </ProfileConfigListItem>
      </ProfileConfigWrapper>
    </ProfileConfigModalWrapper>
  );
};

export default ProfileConfigModal;

/*

let marginDirection = {
  marginL: "margin-left",
  marginR: "margin-right",
  marginB: "margin-bottom",
  marginT: "margin-top",
};

let paddingDirection = {
  paddingT: "padding-top",
  paddingL: "padding-left",
  paddingB: "padding-bottom",
  paddingR: "padding-right",
};

let paddingDynamic = (props) => {
  let paddingValue = ``;

  for (const key in props) {
    if (paddingDirection[key]) {
      paddingValue += `
        ${paddingDirection[key]} : ${props[key]}px
        `;
    }
  }

  return paddingValue;
};

let marginDynamic = (props) => {
  let marginValue = ``;

  for (const key in props) {
    if (marginDirection[key]) {
      marginValue += `
        ${marginDirection[key]} : ${props[key]}px
        `;
    }
  }

  return marginValue;
};

export const ProfileConfigModalWrapper = styled.div`
  position:fixed;
  z-index: 17;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

`;

export const ProfileConfigWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 20;
  width: 500px;
  height: auto;
  background-color: white;
  border-radius: 10px;
  opacity: 1;
`;

export const ProfileConfigListItem = styled.div`
  width: 100%;
  height: auto;
  border: 0.5px solid gray;
  color: gray;
  align-items: center;
  padding: 10px;
`;

export const ConfigTitle = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

export const ConfigTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OpenIcon = styled(MdOutlineKeyboardArrowDown)`
  font-size: 30px;
  cursor: pointer;
`;

export const CloseIcon = styled(MdOutlineKeyboardArrowUp)`
  font-size: 30px;
  cursor: pointer;
`;
*/
