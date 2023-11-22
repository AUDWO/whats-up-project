import React, { useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";

//Atoms
import toggleValueAtom from "../../../store/ToggleValueAtom";
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import stateUpdateAtom from "../../../store/stateUpdateAtom";

//Styled-Components
import {
  ConfigWrapper,
  ConfigOptionWrapper,
  PostButtonWrapper,
  PostButton,
} from "../../../StyledComponents/ProfileStyle/ProfileConfig/ProfileConfigCommonSt";

import {
  ProfileImgSelectButtonWrapper,
  ConfigImgOptionWrapper,
  ProfileImgWrapper,
  ProfileImg,
  BasicProfileImgIcon,
  ProfileImgSelectIcon,
  OptionTitle,
} from "../../../StyledComponents/ProfileStyle/ProfileConfig/ProfileInfoSettingOptionCpSt";

import { Input } from "../../../StyledComponents/CommonCpStyle/Input/Input";

const ProfileInfoSettingOptionCp = ({ userInfo }) => {
  const [profileImg, setProfileImg] = useState(userInfo.img);
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [userName, setUserName] = useState(userInfo.name);
  const [userNickname, setUserNickname] = useState(userInfo.nickname);
  const [userInfoChange, setUserInfoChange] = useRecoilState(
    toggleValueAtom("userInfoChange")
  );

  const [userInfoUpdate, setUserInfoUpdate] = useRecoilState(
    stateUpdateAtom("userInfo")
  );
  const setProfileConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileConfigModal")
  );

  const formData = new FormData();
  if (newProfileImg) {
    formData.append("img", newProfileImg);
  }

  function handleImgSelect(e) {
    const selectedImg = e.target.files[0];
    if (selectedImg && selectedImg.type.startsWith("image/")) {
      setNewProfileImg(selectedImg);
    }
  }

  const handlePost = async () => {
    try {
      if (newProfileImg) {
        const imgData = await axios.post("/post/profile-img", formData);
        const response = await axios.patch("/update/user/profile-info", {
          img: imgData.data.url,
          nickname: userNickname,
          name: userName,
        });
      }

      if (!newProfileImg) {
        const response = await axios.patch("/update/user/profile-info", {
          nickname: userNickname,
          name: userName,
        });
      }
      setProfileConfigModalOpen(false);
      setUserInfoUpdate(!userInfoUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ConfigWrapper>
      <ConfigOptionWrapper height={"auto"} flexD={"column"}>
        <div>이름</div>
        <Input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          width="100%"
          height="50px"
          color="gray"
          borderR="7px"
          backC="#ffffff"
          fontSize="15px"
          paddingL="10"
          marginT="10"
          border={{ borderPx: "0.5px", color: "gray" }}
        />
      </ConfigOptionWrapper>
      <ConfigOptionWrapper height={"auto"} marginT={"10"} flexD={"column"}>
        사용자 이름
        <Input
          value={userNickname}
          onChange={(e) => {
            setUserNickname(e.target.value);
          }}
          height="50px"
          width="100%"
          color="gray"
          borderR="7px"
          backC="#ffffff"
          fontSize="15px"
          paddingL="10"
          marginT="10"
          border={{ borderPx: "0.5px", color: "gray" }}
        />
      </ConfigOptionWrapper>
      <ConfigImgOptionWrapper height={"auto"}>
        <ProfileImgWrapper>
          {ProfileImg ? (
            <ProfileImg
              src={
                newProfileImg ? URL.createObjectURL(newProfileImg) : profileImg
              }
            />
          ) : (
            <>
              {newProfileImg ? (
                <ProfileImg src={newProfileImg} />
              ) : (
                <BasicProfileImgIcon />
              )}
            </>
          )}
        </ProfileImgWrapper>

        <ProfileImgSelectButtonWrapper htmlFor="profileImg">
          <ProfileImgSelectIcon />
          <OptionTitle>프로필 사진 변경하기</OptionTitle>
          <Input
            id="profileImg"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              handleImgSelect(e);
            }}
            height="50px"
            color="gray"
            borderR="7px"
            backC="#ffffff"
            fontSize="15px"
            paddingL="10"
            marginT="10"
            border={{ borderPx: "0.5px", color: "gray" }}
          />
        </ProfileImgSelectButtonWrapper>
      </ConfigImgOptionWrapper>
      <PostButtonWrapper>
        <PostButton
          onClick={() => {
            handlePost();
            setUserInfoChange(!userInfoChange);
          }}
        >
          저장하기
        </PostButton>
      </PostButtonWrapper>
    </ConfigWrapper>
  );
};

export default ProfileInfoSettingOptionCp;
