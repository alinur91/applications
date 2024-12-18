import { createContext } from "react";

export type User = {
  email: string;
  password: string;
  fullName?: string;
  isManager: boolean;
};

export type AuthContextType = {
  registeredAccountsList: User[];
  isManager: boolean | undefined;
  loggedInUser: User | null;
  registerAccount: (user: User) => void;
  signOut: () => void;
  isEmailRegistered: (email: string) => boolean;
  findUserByEmail: (email: string) => User | undefined;
  setLoggedInUserData: (user: User) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
