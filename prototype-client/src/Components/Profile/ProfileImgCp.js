import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

//Component
import ProfileInfoCp from "./ProfileInfoCp";

//Styled-Component
import { BasicProfileImg } from "../../StyledComponents/CommonCpStyle/Icon/BasicProfileIcom";

const ProfileImgCp = ({ userInfo, otherUserId }) => {
  const [otherUserInfo, setOtherUserInfo] = useState({});

  useEffect(() => {
    const fetchOtherUserInfoData = async () => {
      try {
        const otherUserInfoResponse = await axios.get(
          `/page/user-info/${otherUserId}`
        );

        setOtherUserInfo({ ...otherUserInfoResponse.data });
      } catch (error) {
        console.error(error);
      }
    };

    if (otherUserId) {
      fetchOtherUserInfoData();
    }
  }, [otherUserId]);

  if (userInfo) {
    return (
      <ProfileWrapper>
        {userInfo.img ? (
          <ProfileImg src={userInfo.img} />
        ) : (
          <BasicProfileImg fontSize={"180px"} />
        )}
        <ProfileInfoCp userInfo={userInfo} />
      </ProfileWrapper>
    );
  }

  if (otherUserId && Object.keys(otherUserInfo).length >= 2) {
    console.log("otherUserId-ProfileImgCp");
    return (
      <ProfileWrapper>
        {otherUserInfo.img ? (
          <ProfileImg src={otherUserInfo.img} />
        ) : (
          <BasicProfileImg fontSize={"120px"} />
        )}
        <ProfileInfoCp otherUserInfo={otherUserInfo} />
      </ProfileWrapper>
    );
  }
};

export default ProfileImgCp;

export const ProfileWrapper = styled.div`
  height: 35%;
  display: flex;
  padding: 40px 60px 40px 60px;
`;

export const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: black;
  object-fit: cover;
`;
