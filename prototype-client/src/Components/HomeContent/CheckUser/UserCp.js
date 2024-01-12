import UserWrapper from "../../../StyledComponents/HomeStyle/Section3/UserWrapper";

//Styled-components
import {
  ContentWrapper,
  DiaryWrapper,
  PostWrapper,
} from "../../../StyledComponents/HomeStyle/Section3/ContentWrapper";

//Component
import ProfileCp from "../../Common/Profile/ProfileCp";

const UserCp = ({ userInfo }) => {
  //const userInfo = UserInfoQuery();

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

export default UserCp;
