import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

//Component
import ProfileInfoCp from "./ProfileInfoCp";

//Styled-Component
import { BasicProfileImg } from "../../StyledComponents/CommonCpStyle/Icon/BasicProfileIcom";
import { useQuery } from "@tanstack/react-query";
import { useUserInfoValue } from "../../contextApi/UserInfoProvider";

const ProfileImgCp = ({ otherUserId }) => {
  const [otherUserInfo, setOtherUserInfo] = useState({});

  //const didMount = useRef(false);

  //console.log(otherUserId, "otherUserId otherUserId otherUserId otherUserId");

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

  //otherUserInfo는 굳이 캐싱할 필요가 없기때문에 useQuery를 사용하지 않음.
  useEffect(() => {
    if (otherUserId) {
      fetchOtherUserInfoData();
    }
  }, [otherUserId]);

  /*
  const otherUserInfo = useQuery({
    queryKey: [otherUserId ? `otherUserInfo${otherUserId}` : "otherUserInfo"],
    queryFn: fetchOtherUserInfoData,
    enabled: !!otherUserId,
  });*/

  //console.log(otherUserInfo, "otherUserInfo - useQuery USEQUERYUSEQUERY");

  const userInfo = useUserInfoValue();

  //console.log(userInfo, "userInfo in ProfileImgCp");
  //const userData = Array.isArray(userInfo) ? userInfo[0] : userInfo;
  //console.log(userData, "userData");

  if (!otherUserId && userInfo) {
    return (
      <ProfileWrapper>
        {userInfo.profileImg ? (
          <ProfileImg src={userInfo.profileImg} />
        ) : (
          <BasicProfileImg fontSize={"180px"} />
        )}
        <ProfileInfoCp userInfo={userInfo} />
      </ProfileWrapper>
    );
  }

  if (otherUserId && Object.keys(otherUserInfo).length >= 1) {
    return (
      <ProfileWrapper>
        {otherUserInfo.img ? (
          <ProfileImg src={otherUserInfo.img} />
        ) : (
          <BasicProfileImg fontSize={"180px"} />
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
