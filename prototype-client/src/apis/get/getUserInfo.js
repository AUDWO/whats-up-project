import axios from "axios";

const getUserInfo = async ({ userId }) => {
  return await axios.get(`/GET/user-info/${userId}`);
};

export default getUserInfo;
