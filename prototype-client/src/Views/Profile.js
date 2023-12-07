import React from "react";
import HomeWraper from "../StyledComponents/HomeStyle/HomeWrapper";

import ProfileCp from "../Components/Profile/ProfileCp";
import { useParams } from "react-router-dom";
import { UserInfoProvider } from "../contextApi/UserInfoProvider";

const Profile = () => {
  const { otherUserId } = useParams();

  if (otherUserId) {
    console.log("otherUserId는 존재해!!");
    return (
      <HomeWraper>
        <UserInfoProvider>
          <ProfileCp otherUserId={otherUserId} />
        </UserInfoProvider>
      </HomeWraper>
    );
  }
  if (!otherUserId) {
    console.log("otherUserId는 존재하지 않아!!!");
    return (
      <HomeWraper>
        <UserInfoProvider>
          <ProfileCp />
        </UserInfoProvider>
      </HomeWraper>
    );
  }
};

export default Profile;
