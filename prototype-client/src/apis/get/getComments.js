import axios from "axios";

const getComments = async ({ contentType, contentId }) => {
  return await axios.get(`/page/render-${contentType}-comments/${contentId}`);
};

export default getComments``;
