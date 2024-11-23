import { useState, useEffect, ReactNode } from "react";

import { Application, ApplicationsContext } from "../types/applicationContext";

import axios from "axios";

const BASE_URL = "http://localhost:3000/applications";

export const ApplicationsProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setApplications(response.data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  };

  const submitNewApplication = async (application: Application) => {
    try {
      await axios.post(BASE_URL, application);
      setApplications((prev) => [...prev, application]);
    } catch (error) {
      console.error("Error submitting application:", error);
      throw error;
    }
  };

  const updateApplicationStatus = async (
    applicationId: string,
    updates: Partial<Application>
  ) => {
    try {
      await axios.patch(`${BASE_URL}/${applicationId}`, updates);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, ...updates } : app
        )
      );
    } catch (error) {
      console.error("Error updating application:", error);
      throw error;
    }
  };

  const doesApplicantExist = (email: string) =>
    applications.some((app) => app.email === email);

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        submitNewApplication,
        updateApplicationStatus,
        doesApplicantExist,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
