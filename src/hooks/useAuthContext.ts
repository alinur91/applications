import { useContext } from "react";
import { AuthContext } from "../types/authContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context must be used within a AuthProvider");
  }
  return context;
};
