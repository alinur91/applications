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

  const getApplicationById = async (id: string): Promise<Application> => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching application with ID ${id}:`, error);
      throw error;
    }
  };

  const submitNewApplication = async (application: Application) => {
    try {
      const response = await axios.post(BASE_URL, application);
      setApplications((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error submitting application:", error);
      throw error;
    }
  };

  const updateApplication = async (
    id: string,
    updates: Partial<Application>
  ) => {
    try {
      await axios.patch(`${BASE_URL}/${id}`, updates);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
      );
    } catch (error) {
      console.error("Error updating application:", error);
      throw error;
    }
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        submitNewApplication,
        getApplicationById,
        updateApplication,
        getApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
