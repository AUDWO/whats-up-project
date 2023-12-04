import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

//import { BsThreeDotsVertical } from "react-icons/bs";

//Stlyed-Components
import { ProfilePageWrapper } from "../../StyledComponents/ProfileStyle/ProfileCpSt";
//Components
import ProfileImgCp from "./ProfileImgCp";
import ProfileContentsCp from "./ProfileContentsCp";

//Atoms
import userInfoAtom from "../../store/userState/userAtom";
import stateUpdateAtom from "../../store/stateUpdateAtom";
import { useUserInfoValue } from "../../contextApi/UserInfoProvider";
const ProfileCp = ({ otherUserId }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  //프로필 설정 모달에서 프로필 정보 변경 후 프로필 업데이트
  const userInfoUpdate = useRecoilValue(stateUpdateAtom("userInfo"));

  const contentUpdate = useRecoilValue(stateUpdateAtom("contentUpdate"));

  const postUdate = useRecoilValue(stateUpdateAtom("post"));

  const userInfo2 = useUserInfoValue();
  console.log("userInfo2", userInfo2);

  useEffect(() => {
    const fetchUserInfoData = async () => {
      try {
        const userInfoResponse = await axios.get(`/page/user-info`);
        setUserInfo({ ...userInfoResponse.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfoData();
  }, [userInfoUpdate, contentUpdate, postUdate]);

  if (otherUserId) {
    return (
      <>
        <ProfilePageWrapper>
          <ProfileImgCp otherUserId={otherUserId} />
          <ProfileContentsCp otherUserId={otherUserId} />
        </ProfilePageWrapper>
      </>
    );
  }

  if (userInfo) {
    return (
      <ProfilePageWrapper>
        <ProfileImgCp userInfo={userInfo} />
        <ProfileContentsCp userInfo={userInfo} />
      </ProfilePageWrapper>
    );
  }
};

export default ProfileCp;

//------

/*
export const SpaceCp = styled.div`
  width: 100px;
  height: 100px;
`;
export const ContentsWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export const ContentCardsWrapper = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-gap: 10px;
  border: 1px solid red;
`;

export const ContentCard = styled.img`
  width: 350px;
  height: 350px;
  background-color: black;
  object-fit: cover;
  cursor: pointer;
`;

export const ContentDelete = styled(BsThreeDotsVertical)`
  font-size: 30px;
  position: absolute;
  top: 10px;
  right: 15px;
  opacity: 0;
  border-radius: 50%;
  color: #f7dd07;
  background-color: rgba(128, 128, 128, 0.5);
  cursor: pointer;
  transition: all 0.1s;
  padding: 4px;
`;

export const ContentControlModal = styled.div``;

export const ContentCardWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  background-color: black;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    ${ContentDelete} {
      opacity: 1;
    }
  }
`;

export const PublicOrNot = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  border: 3px solid #f7dd07;
  border-radius: 10px;
  color: #f7dd07;
  font-size: 15px;
  font-weight: 500;
  padding: 5px 10px 5px 10px;
  background-color: black;
`;
*/
