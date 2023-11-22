import React, { useEffect, useState } from "react";
import axios from "axios";

//Styled-Component
import {
  DiariesDiv,
  DiarysWrapper,
  StyledLink,
} from "../../StyledComponents/DiaryStyle/DiaryContentsCpSt";

//Component
import DiaryPostCp from "./DiaryPost/DiaryPostCp";

const DiaryContentsCp = ({ filterType }) => {
  const [latestDiaries, setLatestDiaries] = useState([]);
  const [trendingDiaries, setTrendingDiaries] = useState([]);

  useEffect(() => {
    const fetchDiariesData = async () => {
      try {
        const response = await axios.get("/page/render-diaries");

        const dateDiaries = response.data.map((diary) => {
          const date = diary.createdAt;
          return (diary = { ...diary, createdAt: Date.parse(date) });
        });

        const publicDiaries = dateDiaries.filter((diary) => {
          return diary.publicControl === true;
        });

        const latelyDiaries = publicDiaries.toSorted((a, b) => {
          return b.createdAt - a.createdAt;
        });

        const trendingDiaries = publicDiaries.toSorted((a, b) => {
          return b.reactCount - a.reactCount;
        });

        setLatestDiaries([...latelyDiaries]);
        setTrendingDiaries([...trendingDiaries]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiariesData();
  }, []);

  if (filterType === "latest") {
    return (
      <DiarysWrapper>
        <DiariesDiv>
          {latestDiaries.map((diary) => (
            <StyledLink to={`/more-diary/${diary.id}`} key={diary.id}>
              <DiaryPostCp diary={diary} />
            </StyledLink>
          ))}
        </DiariesDiv>
      </DiarysWrapper>
    );
  }
  if (filterType === "trend") {
    return (
      <DiarysWrapper>
        <DiariesDiv>
          {trendingDiaries.map((diary) => (
            <StyledLink to={`/more-diary/${diary.id}`} key={diary.id}>
              <DiaryPostCp diary={diary} />
            </StyledLink>
          ))}
        </DiariesDiv>
      </DiarysWrapper>
    );
  }
};

export default DiaryContentsCp;
