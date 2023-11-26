import React, { useEffect, useState } from "react";
import axios from "axios";

//Component

import MoreContactCp from "../Common/More/MoreContact/MoreContactCp";

//Styled-Component
import {
  MoreStoryContent,
  MoreStoryInfo,
  MoreStoryWrapper,
  MoreStoryContentDiv,
  MoreStoryTimepass,
  MoreStoryContentsWrapper,
  MoreStoryContentWrapper,
  MoreStoryProfileImg,
  MoreStoryProfileName,
  MoreStoryProfileWrapper,
  MoreStoryTimepassDot,
  MoreStoyrImgWrapper,
  MoreStoryImg,
} from "../../StyledComponents/MoreStoryStyle/MoreStoryContentCpSt";

const MoreStoryContentCp = ({ storyId }) => {
  const [storyInfo, setStoryInfo] = useState(null);

  useEffect(() => {
    const fetchMoreStory = async () => {
      try {
        const response = await axios.get(`/page/render-more-story/${storyId}`);

        setStoryInfo({ ...response.data[0] });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMoreStory();
  }, []);

  if (storyInfo) {
    return (
      <MoreStoryWrapper>
        <MoreStoryContentDiv>
          <MoreStoryContentsWrapper>
            <MoreStoryProfileWrapper>
              <MoreStoryProfileImg src={storyInfo.User.profileImg} />
              <MoreStoryInfo>
                <MoreStoryProfileName>
                  {storyInfo.User.nickname}
                </MoreStoryProfileName>
                <MoreStoryTimepass>
                  <MoreStoryTimepassDot />
                  story
                </MoreStoryTimepass>
              </MoreStoryInfo>
            </MoreStoryProfileWrapper>
            <MoreStoyrImgWrapper>
              <MoreStoryImg src={storyInfo.img} />
            </MoreStoyrImgWrapper>
            <MoreStoryContentWrapper>
              <MoreStoryContent>{storyInfo.content}</MoreStoryContent>
              <MoreContactCp contentInfo={storyInfo} reactType={"story"} />
            </MoreStoryContentWrapper>
          </MoreStoryContentsWrapper>
        </MoreStoryContentDiv>
      </MoreStoryWrapper>
    );
  }
};

export default MoreStoryContentCp;
