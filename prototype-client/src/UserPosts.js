import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";

//Component
import PostCp from "./PostCp";

//Atom
import stateUpdateAtom from "./store/stateUpdateAtom";

const UserPosts = () => {
  //const contentUpdate = useRecoilValue(stateUpdateAtom("contentUpdate"));

  const fetchPosts = async () => {
    try {
      return await axios.get("/page/render-posts/");
    } catch (error) {
      console.error(error);
    }
  };

  const postsInfo = useQuery({
    queryKey: ["postInfo"],
    queryFn: fetchPosts,
  });

  //useEffect(() => {}, [contentUpdate]);

  if (postsInfo.data) {
    return (
      <>
        {postsInfo.data.data.map((post) => {
          return <PostCp post={post} key={post.id} />;
        })}
      </>
    );
  }
};

export default UserPosts;
