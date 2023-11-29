import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";

//Component
import PostCp from "./Posting";

//Atom
import stateUpdateAtom from "./store/stateUpdateAtom";

const UserPosts = () => {
  const contentUpdate = useRecoilValue(stateUpdateAtom("contentUpdate"));

  const [posts, setPosts] = useState([]);
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
          return <PostCp post={post} key={post.id} />;
        })}
      </>
    );
  }
};

export default UserPosts;
