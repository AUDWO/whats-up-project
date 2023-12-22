import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";

//Styled-Component
import {
  ProfileInfoWrapper,
  ProfileEditButton,
  ProfileEditWrapper,
  ProfileNameWrapper,
  ProfileNickname,
  ProfileName,
  ProfileJoinedWrapper,
  ProfileJoinedTitle,
  ProfileJoineDate,
  FollowCountWrapper,
  FollowerWrapper,
  FollowerTitle,
  FollowerCountNumber,
  FollowingWrapper,
  FollowingTitle,
  FolloiwngCountNumber,
  FollowButton,
} from "../../StyledComponents/ProfileStyle/ProfileInfoCpSt";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";

const ProfileInfoCp = ({ otherUserInfo, userInfo }) => {
  const [checkFollower, setCheckFollower] = useState(false);

  const setConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileConfigModal")
  );

  //날짜 변환 함수
  const handleDate = (obj) => {
    const dateObject = new Date(obj.createdAt);
    const year = dateObject.getUTCFullYear();
    const month = dateObject.getUTCMonth() + 1;
    const day = dateObject.getUTCDate();
    return `${year}-${month}-${day}`;
  };

  const handleFollow = async () => {
    try {
      await axios.post(`/user/${otherUserInfo.id}/follow`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollow = async () => {
    try {
      await axios.post(`/user/${otherUserInfo.id}/unfollow`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        const response2 = await axios.get(
          `/user/find-followerr/${otherUserInfo.id}`
        );
        setCheckFollower(response2.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (otherUserInfo) {
      fetchFollowData();
    }
  }, [otherUserInfo]);

  if (otherUserInfo && Object.keys(otherUserInfo).length >= 3) {
    return (
      <ProfileInfoWrapper>
        <ProfileNameWrapper>
          <ProfileNickname>{otherUserInfo.nickname}</ProfileNickname>
          {checkFollower ? (
            <FollowButton
              onClick={() => {
                handleUnFollow();
              }}
            >
              팔로우 취소
            </FollowButton>
          ) : (
            <FollowButton
              onClick={() => {
                handleFollow();
              }}
            >
              팔로우
            </FollowButton>
          )}
        </ProfileNameWrapper>
        <ProfileName>{otherUserInfo.name}</ProfileName>
        <ProfileJoinedWrapper>
          <ProfileJoinedTitle>Joined</ProfileJoinedTitle>
          <ProfileJoineDate>{handleDate(otherUserInfo)}</ProfileJoineDate>
        </ProfileJoinedWrapper>
        <FollowCountWrapper>
          <FollowerWrapper>
            <FollowerTitle>팔로워</FollowerTitle>
            <FollowerCountNumber>
              {otherUserInfo.Followers.length}
            </FollowerCountNumber>
          </FollowerWrapper>
          <FollowingWrapper>
            <FollowingTitle>팔로우</FollowingTitle>
            <FolloiwngCountNumber>
              {otherUserInfo.Followings.length}
            </FolloiwngCountNumber>
          </FollowingWrapper>
        </FollowCountWrapper>
      </ProfileInfoWrapper>
    );
  }

  if (userInfo) {
    return (
      <ProfileInfoWrapper>
        <ProfileEditWrapper>
          <ProfileEditButton
            onClick={() => {
              setConfigModalOpen(true);
            }}
          >
            프로필 편집
          </ProfileEditButton>
        </ProfileEditWrapper>
        <ProfileNameWrapper>
          <ProfileNickname>{userInfo.nickname}</ProfileNickname>
        </ProfileNameWrapper>
        <ProfileName>{userInfo.name}</ProfileName>
        <ProfileJoinedWrapper>
          <ProfileJoinedTitle>Joined</ProfileJoinedTitle>
          <ProfileJoineDate>{handleDate(userInfo)}</ProfileJoineDate>
        </ProfileJoinedWrapper>
        <FollowCountWrapper>
          <FollowerWrapper>
            <FollowerTitle>팔로워</FollowerTitle>
            <FollowerCountNumber>{userInfo.follower}</FollowerCountNumber>
          </FollowerWrapper>
          <FollowingWrapper>
            <FollowingTitle>팔로우</FollowingTitle>
            <FolloiwngCountNumber>{userInfo.following}</FolloiwngCountNumber>
          </FollowingWrapper>
        </FollowCountWrapper>
      </ProfileInfoWrapper>
    );
  }
};

export default ProfileInfoCp;
