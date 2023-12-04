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
  /*
  useEffect(() => {
    const response = fetchuserInfoData();
    setUserInfo({ ...response.data });
  }, []);
*/
  return (
    <UserInfoContext.Provider
      value={{
        createdAt: "2023-11-25T02:57:21.000Z",
        diarieslength: 0,
        email: "k1@naver.com",
        follower: 2,
        following: 0,
        id: 2,
        img: "https://whatsup1.s3.ap-northeast-2.amazonaws.com/original/1700881143211__%20%281%29.jpeg",
        name: "리버풀",
        nickname: "Liverpool",
        postslength: 1,
      }}
    >
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
