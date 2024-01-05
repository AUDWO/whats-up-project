import React from "react";
import HomeWraper from "../StyledComponents/HomeStyle/HomeWrapper";

import ProfileCp from "../Components/Profile/ProfileCp";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { otherUserId } = useParams();

  return (
    <HomeWraper>
      <ProfileCp otherUserId={otherUserId} />
    </HomeWraper>
  );
};

export default Profile;
