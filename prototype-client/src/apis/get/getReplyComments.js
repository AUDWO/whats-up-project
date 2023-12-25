import axios from "axios";

const getReplyComments = async ({ contentType, commentId }) => {
  return await axios.get(
    `/page/render-${contentType}-replyComments/${commentId}`
  );
};

export default getReplyComments;
