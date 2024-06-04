import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = ({ redirectPatch = "/login", isAlloved }) => {
  if (!isAlloved) {
    return <Navigate to={redirectPatch} replace={true} />;
  }
  return <Outlet />;
};
