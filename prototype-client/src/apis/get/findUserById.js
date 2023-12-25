import axios from "axios";

const findUserById = async (id) => {
  return await axios.get(`/user/${id}`);
};

export default findUserById;
