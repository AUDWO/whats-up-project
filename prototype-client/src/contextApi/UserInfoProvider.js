import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const response = fetchuserInfoData();
    setUserInfo({ ...response.data });
  }, []);

  const fetchuserInfoData = async () => {
    try {
      const response = await axios.get("/page/user-info");
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};

export function useUserInfoValue() {
  const value = useContext(UserInfoContext);
  if (value === undefined) {
    throw new Error("useUserInfoValue should be used within UserInfoProvider ");
  }
  return value;
}
