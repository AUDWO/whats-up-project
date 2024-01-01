import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Outlet />
    </Suspense>
  );
};

export default PageWrapper;
