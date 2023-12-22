import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";

//Atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProfileInfoSettingOptionCp = ({ userInfo }) => {
  const [profileImg, setProfileImg] = useState(userInfo.profileImg);
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [userName, setUserName] = useState(userInfo.name);
  const [userNickname, setUserNickname] = useState(userInfo.nickname);

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

  //api
  const updateProfileInfo = async () => {
    try {
      if (newProfileImg) {
        const imgData = await axios.post("/post/profile-img", formData);
        const response = await axios.patch("/update/user/profile-info", {
          img: imgData.data.url,
          nickname: userNickname,
          name: userName,
        });
        return response;
      }
      if (!newProfileImg) {
        const response = await axios.patch("/update/user/profile-info", {
          nickname: userNickname,
          name: userName,
        });
        return response;
      }
    } catch (error) {
      console.error(error, "프로필 정보 수정 변경 실패");
    }
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProfileInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      setProfileConfigModalOpen(false);
    },
  });

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
            mutate();
          }}
        >
          저장하기
        </PostButton>
      </PostButtonWrapper>
    </ConfigWrapper>
  );
};

export default ProfileInfoSettingOptionCp;
