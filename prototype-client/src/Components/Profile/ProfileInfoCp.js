import { useSetRecoilState } from "recoil";

//Styled-Component
import {
  ProfileInfoWrapper,
  ProfileNameWrapper,
  ProfileNickname,
  ProfileName,
  ProfileJoinedWrapper,
  ProfileJoinedTitle,
  ProfileJoineDate,
} from "../../StyledComponents/ProfileStyle/ProfileInfoCpSt";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";

import ProfileFollowCp from "./ProfileFollowCp";
console.log("profileInfoCp - profileInfoCp - profileInfoCp");

const ProfileInfoCp = ({ otherUserInfo, userInfo }) => {
  //const [checkFollower, setCheckFollower] = useState(false);

  console.log("profileInfo profileInfo profileInfo ");

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

  if (otherUserInfo && Object.keys(otherUserInfo).length >= 3) {
    return (
      <ProfileInfoWrapper>
        <ProfileNameWrapper>
          <ProfileNickname>{otherUserInfo.nickname}</ProfileNickname>
        </ProfileNameWrapper>
        <ProfileName>{otherUserInfo.name}</ProfileName>
        <ProfileJoinedWrapper>
          <ProfileJoinedTitle>Joined</ProfileJoinedTitle>
          <ProfileJoineDate>{handleDate(otherUserInfo)}</ProfileJoineDate>
        </ProfileJoinedWrapper>
        <ProfileFollowCp otherUserInfoId={otherUserInfo.id} />
      </ProfileInfoWrapper>
    );
  }
  /*
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
  }*/
};

export default ProfileInfoCp;

/*
if (otherUserInfo && Object.keys(otherUserInfo).length >= 3 && isSuccess) {
    return (
      <ProfileInfoWrapper>
        <ProfileNameWrapper>
          <ProfileNickname>{otherUserInfo.nickname}</ProfileNickname>
          {checkFollower?.data ? (
            <FollowButton
              onClick={() => {
                handleUnFollowing();
              }}
            >
              팔로우 취소
            </FollowButton>
          ) : (
            <FollowButton
              onClick={() => {
                handleFollowing();
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




*/
