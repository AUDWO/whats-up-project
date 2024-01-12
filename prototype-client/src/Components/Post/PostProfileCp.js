import React from "react";

import ProfileCp from "../Common/Profile/ProfileCp";

const PostProfileCp = ({ contentUserInfo }) => {
  return (
    <ProfileCp
      pfW={{ left: "20px", top: "15px", position: "absolute" }}
      pfIW={{
        width: "51px",
        height: "51px",
        margin: { r: "15" },
        border: "on",
      }}
      pfI={{
        width: "40px",
        height: "40px",
        zIndex: "4",
        basic: "37.5px",
      }}
      pfN={{
        backC: "black",
        color: "#f7dd07",
        fontS: "13px",
        borderRadius: "10px",
        height: "30px",
        padding: { t: "5", r: "5", b: "5", l: "5" },
      }}
      pfInfo={contentUserInfo}
    />
  );
};

export default PostProfileCp;
