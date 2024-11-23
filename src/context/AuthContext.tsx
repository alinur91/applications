import { useState, useEffect, ReactNode } from "react";
import { AuthContext, User } from "../types/authContext";
import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [registeredUsersList, setRegisteredUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<null | User>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Fetch users from db.json when the app loads
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setRegisteredUsers(response.data || []);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const registerUser = async (user: User) => {
    try {
      await axios.post(BASE_URL, user);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const isEmailRegistered = (email: string): boolean =>
    registeredUsersList.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

  const findUserByEmail = (email: string): User | undefined =>
    registeredUsersList.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

  const setLoggedInUserData = (userData: User | null) => {
    setLoggedInUser(userData);
    if (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registeredUsersList,
        registerUser,
        isEmailRegistered,
        findUserByEmail,
        setLoggedInUserData,
        loggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
