import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const PageWrapper = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  );
};

export default PageWrapper;
