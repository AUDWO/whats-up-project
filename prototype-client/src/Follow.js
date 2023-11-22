import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Follow = ({ userId }) => {
  console.log("userId입니다.", userId);
  const navigate = useNavigate();

  const handleFollowing = async () => {
    await axios.post(`/user/${userId}/follow`);
    navigate("/userr");
  };
  return (
    <div>
      <button onClick={handleFollowing}>팔로우 하기</button>
    </div>
  );
};

export default Follow;
