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
import { useQuery } from "@tanstack/react-query";

const DiaryContentsCp = ({ filterType }) => {
  /*
  useEffect(() => {
    const fetchDiariesData2 = async () => {
      try {
        const response = await axios.get("/page/render-diaries");
        console.log(response.data, "rererererererer");

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

    fetchDiariesData2();
  }, []);*/

  const fetchDiariesData = async () => {
    try {
      const response = await axios.get("/page/render-diaries");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["diaries"],
    queryFn: fetchDiariesData,
  });

  const dateDiaries = data?.map((diary) => {
    return { ...diary, createdAt: Date.parse(diary.createdAt) };
  });

  const publicDiaries = dateDiaries?.filter((diary) => {
    return diary.publicControl === true;
  });

  const latelyDiaries = publicDiaries?.toSorted((a, b) => {
    return b.createdAt - a.createdAt;
  });

  const trendingDiaries = publicDiaries?.toSorted((a, b) => {
    return b.reactCount - a.reactCount;
  });

  if (filterType === "latest") {
    return (
      <DiarysWrapper>
        <DiariesDiv>
          {latelyDiaries?.map((diary) => (
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
          {trendingDiaries?.map((diary) => (
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
