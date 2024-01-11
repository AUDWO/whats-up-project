import { useSetRecoilState } from "recoil";

import styled from "styled-components";

//Styled-Component
import {
  ProfileInfoWrapper,
  ProfileNameWrapper,
  ProfileNickname,
  ProfileName,
  ProfileJoinedWrapper,
  ProfileJoinedTitle,
  ProfileJoineDate,
  ProfileEditWrapper,
  ProfileEditButton,
} from "../../StyledComponents/ProfileStyle/ProfileInfoCpSt";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";

import ProfileFollowCp from "./ProfileFollowCp";
console.log("profileInfoCp - profileInfoCp - profileInfoCp");

const ProfileInfoCp = ({ otherUserInfo, userInfo }) => {
  //const [checkFollower, setCheckFollower] = useState(false);

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

export const FollowerWrapper = styled.span`
  margin-right: 40px;
`;

export const FollowerTitle = styled.span`
  font-size: 15px;
`;

export const FollowerCountNumber = styled.span`
  font-weight: 600;
  margin-left: 5px;
`;

export const FolloiwngCountNumber = styled.span`
  margin-left: 5px;
  font-weight: 600;
`;

export const FollowCountWrapper = styled.div`
  height: auto;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const FollowingWrapper = styled.span``;

export const FollowingTitle = styled.span`
  font-size: 15px;
`;
