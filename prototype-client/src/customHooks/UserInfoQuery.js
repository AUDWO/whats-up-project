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
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["myUserInfo"],
    queryFn: getMyInfo,
    staleTime: Infinity,
  });

  return { ...data?.data, isLoading, isFetching };
};

export default UserInfoQuery;
