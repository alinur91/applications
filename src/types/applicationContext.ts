import { createContext } from "react";

export type Application = {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  description: string;
  fileUrl: string;
  status: "Pending" | "Reviewed" | "Approved" | "Rejected";
  comments?: string;
};

type ApplicationsContextType = {
  applications: Application[];
  submitNewApplication: (application: Application) => Promise<void>;
  updateApplicationStatus: (
    id: string,
    updates: Partial<Application>
  ) => Promise<void>;
};

export const ApplicationsContext = createContext<ApplicationsContextType | null>(
  null
);
