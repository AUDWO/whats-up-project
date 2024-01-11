import React from "react";

//Styled-Components
import {
  StoryImg,
  StoryContent,
} from "../../../StyledComponents/HomeContentStyle/StoryContentCpSt";
import ProfileCp from "../../Common/Profile/ProfileCp";

const StoryContentCp = ({ story, backC }) => {
  return (
    <StoryContent>
      <StoryImg src={story?.img} backC={backC} />
      {!backC && (
        <ProfileCp
          pfW={{
            position: "absolute",
            zIndex: "3",
            width: "110px",
            flexD: "column",
            margin: { b: "10" },
          }}
          pfI={{
            border: "on",
            width: "40px",
            height: "40px",
            margin: { b: "7" },
            basic: "37.5px",
          }}
          pfN={{
            color: "#fae66a",
            borderRadius: "10px",
            padding: { t: "5", r: "7", b: "5", l: "7" },
            backC: "black",
            fontF: "Gothic A1",
            fontS: "12px",
          }}
          pfInfo={story.User}
        />
      )}
    </StoryContent>
  );
};

export default StoryContentCp;
