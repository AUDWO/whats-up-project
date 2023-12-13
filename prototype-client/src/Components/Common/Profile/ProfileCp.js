import React from "react";

import {
  ProfileWrapper,
  ProfileImgWrapper,
  ProfileImg,
  BasicProfileImg,
  ProfileNickname,
} from "../../../StyledComponents/CommonCpStyle/Profile/ProfileCpSt";

const ProfileCp = ({ pfW, pfIW, pfI, pfN, pfInfo }) => {
  return (
    <ProfileWrapper
      p={pfW?.position}
      l={pfW?.left}
      t={pfW?.top}
      fD={pfW?.flexD}
      pd={pfW?.padding}
      mg={pfW?.margin}
      jC={pfW?.justifyC}
      w={pfW.width}
      zI={pfW?.zIndex}
    >
      <ProfileImgWrapper
        w={pfIW?.width}
        h={pfIW?.height}
        b={pfIW?.border}
        mg={pfIW?.margin}
      >
        {pfInfo.profileImg ? (
          <ProfileImg
            src={pfInfo.profileImg}
            w={pfI?.width}
            h={pfI?.height}
            zI={pfI?.zIndex}
            mg={pfI?.margin}
          />
        ) : (
          <BasicProfileImg fS={pfI.basic} zI={pfI?.zIndex} mg={pfI?.margin} />
        )}
      </ProfileImgWrapper>
      <ProfileNickname
        bC={pfN?.backC}
        c={pfN?.color}
        bR={pfN?.borderRadius}
        h={pfN?.height}
        fW={pfN?.fontW}
        fS={pfN?.fontS}
        fF={pfN?.fontF}
        pd={pfN?.padding}
      >
        {pfInfo.nickname}
      </ProfileNickname>
    </ProfileWrapper>
  );
};

export default ProfileCp;
