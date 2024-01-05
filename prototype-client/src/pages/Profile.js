import React from "react";
import HomeWraper from "../StyledComponents/HomeStyle/HomeWrapper";

import ProfileCp from "../Components/Profile/ProfileCp";
import { useParams } from "react-router-dom";
import { UserInfoProvider } from "../contextApi/UserInfoProvider";

const Profile = () => {
  const { otherUserId } = useParams();

  return (
    <HomeWraper>
      <UserInfoProvider>
        <ProfileCp otherUserId={otherUserId} />
      </UserInfoProvider>
    </HomeWraper>
  );
};

export default Profile;
