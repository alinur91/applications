import { useContext } from "react";
import { ApplicationsContext } from "../types/applicationContext";

export const useApplicationsContext = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error(
      "Context must be used within a useApplicationsContext"
    );
  }
  return context;
};
