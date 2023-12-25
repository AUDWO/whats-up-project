import axios from "axios";

const getContents = async ({ contentType, userId }) => {
  return userId
    ? await axios.get(`/Get/all-${contentType}/${userId}`)
    : await axios.get(`/Get/all-${contentType}`);
};

export default getContents;
