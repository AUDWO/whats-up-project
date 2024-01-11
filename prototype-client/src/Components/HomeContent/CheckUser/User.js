import UserWrapper from "../../../StyledComponents/HomeStyle/Section3/UserWrapper";

//Styled-components
import {
  ContentWrapper,
  DiaryWrapper,
  PostWrapper,
} from "../../../StyledComponents/HomeStyle/Section3/ContentWrapper";
import styled from "styled-components";

//Component
import ProfileCp from "../../Common/Profile/ProfileCp";

//Custom hook
import UserInfoQuery from "../../../customHooks/userInfoQuery";
import LoadingCheckUserCp from "./LoadingCheckUserCp";

const User = () => {
  const userInfo = UserInfoQuery();

  if (userInfo.isLoading) {
    return <LoadingCheckUserCp />;
  }

  return (
    <UserWrapper>
      <ProfileCp
        pfInfo={userInfo}
        pfW={{}}
        PfN={{ padding: { t: "5", r: "5", b: "5", l: "5" } }}
        pfI={{ width: "35px", height: "35px", basic: "40px" }}
        pfIW={{ margin: { r: "20" } }}
      />
      <ContentWrapper>
        <PostWrapper>
          <div>게시글</div>
          <div>{userInfo?.postslength}</div>
        </PostWrapper>
        <DiaryWrapper>
          <div>일기</div>
          <div>{userInfo?.diarieslength}</div>
        </DiaryWrapper>
      </ContentWrapper>
    </UserWrapper>
  );
};

export default User;

const LoadingProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingProfileImg = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ddd9d9;
`;

const LoadingProfileNickname = styled.div`
  height: 17px;
  width: 50px;
  background-color: #ddd9d9;
  margin-left: 15px;
`;

const LoadingContentsInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const LoadingContentInfoWrapper = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoadingContentTitle = styled.div`
  width: 35px;
  height: 17px;
  background-color: #ddd9d9;
  margin-bottom: 5px;
`;

const LoadingContentNumber = styled.div`
  width: 17px;
  height: 24px;
  background-color: #ddd9d9;
`;
