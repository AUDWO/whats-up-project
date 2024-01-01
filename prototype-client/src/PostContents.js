import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

import styled from "styled-components";

//Component
import PostCp from "./Components/Post/PostCp";
import SpinnerCp from "./Components/Common/Spinner/SpinnerCp";

const PostContentsCp = () => {
  const morePostsRef = useRef(null);
  //timeout을 사용하여 일정 시간동안은 intersection이 작용하지 않도록
  let timeoutId = null;

  const [lastPageCheckState] = useState(false);

  const intersectionCallback = (entreis, observer) => {
    entreis.forEach((entry) => {
      if (entry.isIntersecting && !timeoutId) {
        if (!lastPageCheckState) fetchNextPage();

        timeoutId = setTimeout(() => {
          timeoutId = null;
        }, 1000);
      }
    });
  };

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(intersectionCallback, options);

    if (morePostsRef.current) {
      console.log("target-current");
      observer.observe(morePostsRef.current);
    }

    return () => {
      if (morePostsRef.current) {
        observer.unobserve(morePostsRef.current);
      }
    };
  }, []);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => {
      return axios.get(`/page/render-posts/?page=${pageParam}&perPage=5`);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data.lastPageCheck) {
        return parseInt(lastPage.data.page) + 1;
      }
      return;
    },
    gcTime: 0,
  });

  return (
    <>
      {data ? (
        data.pages.map((postData) => {
          return postData.data.posts.map((post, idx) => (
            <PostCp
              post={post}
              key={post.id}
              blurhashedImg={postData.data.blurhashedImgs[idx]}
            />
          ));
        })
      ) : (
        <Rendering />
      )}
      <PostDivWrapper ref={morePostsRef}>
        <PostWrapper>
          {hasNextPage ? (
            <SpinnerWrapper>
              <SpinnerCp color="#f7dd07" size="60px" />
            </SpinnerWrapper>
          ) : (
            data && <NoPage>더 이상 게시물이 존재하지 않습니다.</NoPage>
          )}
        </PostWrapper>
      </PostDivWrapper>
    </>
  );
};

export default PostContentsCp;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 150x;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoPage = styled.span`
  font-size: 20px;
  color: black;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PostWrapper = styled.div`
  position: relative;
  width: 410px;
  height: 150px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const PostDivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Rendering = styled.div`
  width: 400px;
  height: 600px;
`;
