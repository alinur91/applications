import { createContext } from "react";

export type ApplicationData = {
  fullName: string;
  email: string;
  description: string;
  file: FileList;
};

export enum ApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export type Application = {
  id: string;
  fullName: string;
  submittedUsersEmail: string;
  email: string;
  description: string;
  file: FileList | string;
  status: ApplicationStatus;
  comments?: string;
};

type ApplicationsContextType = {
  applications: Application[];
  doesApplicantExist: (email: string) => boolean;
  submitNewApplication: (application: Application) => Promise<void>;
  updateApplicationStatus: (
    id: string,
    updates: Partial<Application>
  ) => Promise<void>;
};

export const ApplicationsContext = createContext<
  ApplicationsContextType | undefined
>(undefined);
