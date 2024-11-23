import { useState, useEffect, ReactNode } from "react";
import { Auth, User } from "../types/authContext";
import axios from "axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
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
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const registerUser = async (user: User) => {
    try {
      await axios.post("http://localhost:3000/users", user);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const isEmailRegistered = (email: string): boolean => {
    return users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  const findUserByEmail = (email: string): User | undefined => {
    return users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  const setLoggedInUserData = (userData: User | null) => {
    setLoggedInUser(userData);
    if (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.removeItem("user");
    }
  };

  return (
    <Auth.Provider
      value={{
        users,
        registerUser,
        isEmailRegistered,
        findUserByEmail,
        setLoggedInUserData,
        loggedInUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
