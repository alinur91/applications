import { useState, useEffect, ReactNode } from "react";
import { AuthContext, User } from "../types/authContext";
import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [registeredAccountsList, setRegisteredAccountsList] = useState<User[]>(
    []
  );
  const [loggedInUser, setLoggedInUser] = useState<null | User>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Fetch users from db.json when the app loads
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setRegisteredAccountsList(response.data || []);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const registerAccount = async (user: User) => {
    try {
      const response = await axios.post(BASE_URL, user);
      const newUser = response.data;
      setRegisteredAccountsList((prevRegiseredAccounts) => [
        ...prevRegiseredAccounts,
        newUser,
      ]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const isEmailRegistered = (email: string): boolean =>
    registeredAccountsList.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

  const findUserByEmail = (email: string): User | undefined =>
    registeredAccountsList.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

  const setLoggedInUserData = (userData: User) => {
    setLoggedInUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signOut = () => {
    setLoggedInUser(null);
    localStorage.removeItem("user");
  };

  const isManager = loggedInUser?.isManager;

  return (
    <AuthContext.Provider
      value={{
        registeredAccountsList,
        registerAccount,
        isEmailRegistered,
        findUserByEmail,
        setLoggedInUserData,
        signOut,
        loggedInUser,
        isManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
