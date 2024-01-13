import { Outlet, Navigate, useLocation } from "react-router-dom";
import UserInfoQuery from "../customHooks/userInfoQuery";

const ProtectedRoute = () => {
  const userInfo = UserInfoQuery();
  const currentLocation = useLocation();
  return userInfo.loginCheck ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ redirectedFrom: currentLocation }}
    />
  );
};

export default ProtectedRoute;
