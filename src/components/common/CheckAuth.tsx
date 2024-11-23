import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ReactNode } from "react";

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const { loggedInUser: isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (isAuthenticated.isManager) return <Navigate to="/manager/listing" />;
    else return <Navigate to="/user/listing" />;
  }

  if (
    isAuthenticated &&
    isAuthenticated.isManager &&
    location.pathname.includes("/user")
  ) {
    return <Navigate to="/manager/listing" />;
  }

  if (
    isAuthenticated &&
    !isAuthenticated.isManager &&
    location.pathname.includes("/manager")
  ) {
    return <Navigate to="/user/listing" />;
  }

  return <div>{children}</div>;
};

export default CheckAuth;
