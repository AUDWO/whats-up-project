import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

import styled from "styled-components";

//Component
import PostCp from "./Posting";

//Atom
import stateUpdateAtom from "./store/stateUpdateAtom";

const UserPosts = () => {
  const contentUpdate = useRecoilValue(stateUpdateAtom("contentUpdate"));

  const fetchPosts = async () => {
    try {
      return await axios.get("/page/render-posts/");
    } catch (error) {
      console.error(error);
    }
  };

  const postsInfo = useSuspenseQuery({
    queryKey: ["postInfo"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    //fetchPosts();
  }, [contentUpdate]);

  console.log("postsInfo.data");
  console.log(postsInfo.data);
  console.log("postsInfo.data");

  if (postsInfo.data) {
    return (
      <>
        {postsInfo.data.data.map((post) => {
          return (
            <Suspense fallback={<Loading />}>
              <PostCp post={post} key={post.id} />;
            </Suspense>
          );
        })}
      </>
    );
  }
};

export default UserPosts;

const Loading = styled.div`
  width: 100px;
  height: 400px;
  background-color: ;
`;
