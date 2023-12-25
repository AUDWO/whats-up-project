import axios from "axios";

const getOnlyContent = async ({ contentId, contentType }) => {
  return await axios.get(`/GET/only-${contentType}/${contentId}`);
};

export default getOnlyContent;
