import { createContext } from "react";

export type User = {
  email: string;
  password: string;
  fullName?: string;
  isManager: boolean;
};

export type AuthContextType = {
  users: User[];
  loggedInUser: User | null;
  registerUser: (user: User) => void;
  isEmailRegistered: (email: string) => boolean;
  findUserByEmail: (email: string) => User | undefined;
  setLoggedInUserData: (user: User | null) => void;
};

export const Auth = createContext<AuthContextType | undefined>(undefined);
