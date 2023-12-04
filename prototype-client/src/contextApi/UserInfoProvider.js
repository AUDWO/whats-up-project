import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const fetchuserInfoData = async () => {
    try {
      const response = await axios.get("/page/user-info");
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  /*useEffect(() => {
    try {
      const response = fetchuserInfoData();
      setUserInfo({ ...response.data });
    } catch (error) {
      console.error("context useEffect fail", error);
    }
  }, []);*/

  if (Object.keys(userInfo).length >= 1) {
    return (
      <UserInfoContext.Provider value={{ data: 1 }}>
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
