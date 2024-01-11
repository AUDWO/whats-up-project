import axios from "axios";
import styled from "styled-components";
import { FaUser } from "react-icons/fa6";

//Component
import ProfileInfoCp from "./ProfileInfoCp";

//Styled-Component
import { BasicProfileImg } from "../../StyledComponents/CommonCpStyle/Icon/BasicProfileIcom";

//Custom hook
import UserInfoQuery from "../../customHooks/userInfoQuery";
import { useQuery } from "@tanstack/react-query";

const ProfileIntroduceCp = ({ otherUserId }) => {
  const fetchOtherUserInfoData = async () => {
    try {
      return await axios.get(`/page/user-info/${otherUserId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const { data: otherUserInfo, isLoading: otherUserInfoLoading } = useQuery({
    queryKey: [`otherUserInfo-${otherUserId}`],
    queryFn: fetchOtherUserInfoData,
    enabled: !!otherUserId,
  });

  const userInfo = UserInfoQuery();

  if (otherUserInfoLoading) {
    return (
      <LoadingProfileWrapper>
        <LoadingProfileImg />
        <LoadingProfileInfoWrapper>
          <LoadingProfileNickname />
          <LoadingProfileJoined />
          <LoadingFollowButton />
          <LoadingFollowNumber />
        </LoadingProfileInfoWrapper>
      </LoadingProfileWrapper>
    );
  }

  if (!otherUserId && userInfo) {
    return (
      <ProfileWrapper>
        {userInfo.profileImg ? (
          <ProfileImg src={userInfo.profileImg} />
        ) : (
          <BasicProfileImg fontSize={"150px"} />
        )}
        <ProfileInfoCp userInfo={userInfo} />
      </ProfileWrapper>
    );
  }

  if (otherUserId && Object.keys(otherUserInfo?.data).length >= 1) {
    return (
      <ProfileWrapper>
        {otherUserInfo.data.img ? (
          <ProfileImg src={otherUserInfo.data.img} />
        ) : (
          <BasicProfileImg fontSize={"150px"} />
          //<Profile2 />
        )}
        <ProfileInfoCp otherUserInfo={otherUserInfo.data} />
      </ProfileWrapper>
    );
  }
};

export default ProfileIntroduceCp;

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

//- - - - - - - - - - - - - - - - - - - - - - - - - - -

export const Profile2 = styled(FaUser)`
  width: 150px;
  height: 150px;
  padding: 20px;
  border-radius: 50%;
  color: white;
  background-color: black;
`;
export const LoadingProfileWrapper = styled.div`
  height: 35%;
  display: flex;
  padding: 40px 60px 40px 60px;
`;

export const LoadingProfileInfoWrapper = styled.div`
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin-left: 100px;
`;
export const LoadingProfileImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ddd9d9;
`;

export const LoadingProfileNickname = styled.div`
  width: 100px;
  height: 30px;
  background-color: #ddd9d9;
  margin-bottom: 25px;
`;

export const LoadingProfileJoined = styled.div`
  width: 90px;
  height: 20px;
  background-color: #ddd9d9;
  margin-bottom: 20px;
`;

export const LoadingFollowButton = styled.div`
  width: 70px;
  height: 30px;
  background-color: #ddd9d9;
  margin-bottom: 20px;
`;

export const LoadingFollowNumberWrapper = styled.div`
  display: flex;
`;

export const LoadingFollowNumber = styled.div`
  width: 50px;
  height: 20px;
  background-color: #ddd9d9;
  margin-right: 25px;
`;

/*
<ProfileWrapper>
        <LoadingProfileImg />
        <LoadingProfileInfoWrapper>
          <LoadingProfileNickname />
          <LoadingProfileJoined />
          <LoadingFollowButton />
          <LoadingFollowNumber />
        </LoadingProfileInfoWrapper>
      </ProfileWrapper>





*/
