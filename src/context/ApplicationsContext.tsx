import { useState, ReactNode, useCallback } from "react";

import { Application, ApplicationsContext } from "../types/applicationContext";

import axios from "axios";

const BASE_URL = "http://localhost:3000/applications";

export const ApplicationsProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<Error | null>(null);

  const getApplications = useCallback(async () => {
    setIsError(null); // Reset error state
    try {
      const response = await axios.get(BASE_URL);
      setApplications(response.data || []);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error);
      } else {
        setIsError(new Error("An unknown error occurred."));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      if (error instanceof Error) {
        console.error("Error submitting application:", error.message);
        throw error; // Re-throw error to allow the form to handle it
      } else {
        console.error("An unexpected error occurred.");
        throw new Error("An unexpected error occurred.");
      }
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
      if (error instanceof Error) {
        console.error("Error updating application:", error.message);
        throw error; // Re-throw error to allow the form to handle it
      } else {
        console.error("An unexpected error occurred.");
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  return (
    <ApplicationsContext.Provider
      value={{
        isLoading,
        getApplications,
        isError,
        applications,
        submitNewApplication,
        getApplicationById,
        updateApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
