import axios from "axios";

const postUnLike = async (postInfoId) => {
  try {
    return await axios.get(`/post/unlike/${postInfoId}`);
  } catch (error) {
    console.error(error, "postUnLike - Error");
  }
};

export default postUnLike;
