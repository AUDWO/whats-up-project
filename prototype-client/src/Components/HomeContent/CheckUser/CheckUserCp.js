import React from "react";
import SectionContainer from "../../../StyledComponents/HomeStyle/SectionContainer";
import UserCp from "./UserCp";
import styled from "styled-components";
import NoUserCp from "./NoUserCp";

import LoadingCheckUserCp from "./LoadingCheckUserCp";
import UserInfoQuery from "../../../customHooks/userInfoQuery";
import { useNavigate } from "react-router-dom";

const CheckUserCp = () => {
  const userInfo = UserInfoQuery();

  if (userInfo.isLoading) {
    return <LoadingCheckUserCp />;
  }

  return (
    <SectionContainer3 width={"320px"}>
      <section>
        {userInfo.data ? <UserCp userInfo={userInfo} /> : <NoUserCp />}
      </section>
    </SectionContainer3>
  );
};

export default CheckUserCp;

export const SectionContainer3 = styled(SectionContainer)`
  position: absolute;
  right: 0;
  z-index: 1;
  width: ${(props) => props.width};
`;

//   {userInfo.data ? <UserCp userInfo={userInfo} /> : <NoUserCp />}
