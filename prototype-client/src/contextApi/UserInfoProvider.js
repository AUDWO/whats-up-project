import { useContext, createContext } from "react";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const fetchuserInfoData = async () => {
    try {
      return await axios.get("/page/user-info");
    } catch (error) {
      console.error(error);
    }
  };

  const userInfoResponse = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchuserInfoData,
  });

  if (userInfoResponse.data) {
    return (
      <UserInfoContext.Provider value={userInfoResponse.data.data}>
        {children}
      </UserInfoContext.Provider>
    );
  }
};

export function useUserInfoValue() {
  const value = useContext(UserInfoContext);
  if (value === undefined) {
    throw new Error("useUserInfoValue should be used within UserInfoProvider ");
  }
  return value;
}
