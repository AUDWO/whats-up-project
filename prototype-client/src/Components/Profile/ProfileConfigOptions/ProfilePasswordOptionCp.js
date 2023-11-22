import React, { useState } from "react";

//Styled-Components
import {
  ConfigWrapper,
  ConfigOptionWrapper,
  PostButton,
  PostButtonWrapper,
} from "../../../StyledComponents/ProfileStyle/ProfileConfig/ProfileConfigCommonSt";

import { Input } from "../../../StyledComponents/CommonCpStyle/Input/Input";

const ProfilePasswordOptionCp = () => {
  const [existingPassword, setExistingPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");

  /*
  const handlePost = async () => {
    try {
      const imgData = await axios.post("/post/profile-img", formData);

      const response = await axios.patch("/update/user/profile-info", {
        img: imgData.data.url,
        nickname: userNickname,
        name: userName,
      });
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <ConfigWrapper>
      <ConfigOptionWrapper height={"auto"} flexD={"column"}>
        <div>현재 비밀번호</div>
        <Input
          value={existingPassword}
          onChange={(e) => {
            setExistingPassword(e.target.value);
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
        <div>새 비밀번호</div>
        <Input
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
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
      <ConfigOptionWrapper height={"auto"} flexD={"column"} marginT={"10"}>
        <div>새 비밀번호 확인</div>
        <Input
          value={checkNewPassword}
          onChange={(e) => {
            setCheckNewPassword(e.target.value);
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
      <PostButtonWrapper>
        <PostButton onClick={() => {}}>변경하기</PostButton>
      </PostButtonWrapper>
    </ConfigWrapper>
  );
};

export default ProfilePasswordOptionCp;
