import axios from "axios";

const postLike = async (postInfoId) => {
  try {
    return await axios.get(`/post/like/${postInfoId}`);
  } catch (error) {
    console.error(error, "postLike - Error");
  }
};

export default postLike;
