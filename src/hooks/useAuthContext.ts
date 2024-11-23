import { useContext } from "react";
import { Auth } from "../types/authContext";

export const useAuthContext = () => {
  const context = useContext(Auth);
  if (!context) {
    throw new Error("useUsers must be used within a AuthProvider");
  }
  return context;
};
