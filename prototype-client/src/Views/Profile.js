import React from "react";
import HomeWraper from "../StyledComponents/HomeStyle/HomeWrapper";

import ProfileCp from "../Components/Profile/ProfileCp";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { otherUserId } = useParams();

  if (otherUserId) {
    return (
      <HomeWraper>
        <ProfileCp otherUserId={otherUserId} />
      </HomeWraper>
    );
  }
  if (!otherUserId) {
    return (
      <HomeWraper>
        <ProfileCp />
      </HomeWraper>
    );
  }
};

export default Profile;
