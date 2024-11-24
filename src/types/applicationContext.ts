import { createContext } from "react";

export enum ApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export type Application = {
  id: string;
  fullName: string;
  email: string;
  description: string;
  file: FileList | string;
  status: ApplicationStatus;
  comment?: string;
  reviewedBy?: string;
};

type ApplicationsContextType = {
  applications: Application[];
  getApplications: () => void;
  submitNewApplication: (application: Application) => void;
  getApplicationById: (id: string) => Promise<Application | null>;
  updateApplication: (
    id: string,
    updates: Partial<Application>
  ) => Promise<void>;
};

export const ApplicationsContext = createContext<
  ApplicationsContextType | undefined
>(undefined);
