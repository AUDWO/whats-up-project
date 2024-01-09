import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserInfoQuery = () => {
  const getMyInfo = async () => {
    try {
      return await axios.get(`/page/user-info`);
    } catch (error) {
      console.error(error);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["myUserInfo"],
    queryFn: getMyInfo,
  });

  return { ...data?.data, isLoading };
};

export default UserInfoQuery;
