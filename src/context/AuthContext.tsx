// context/AuthContext.tsx
import { createContext, useContext, useState } from "react";

export type Role =
  | "student"
  | "trainer"
  | "institution"
  | "manager"
  | "monitoring";

interface User {
  name: string;
  role: Role;
  token?: string;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {

  const intialUser=localStorage.getItem('user')
  const parsedUser=intialUser?JSON.parse(intialUser):null
  const [user, setUser] = useState<User | null>(parsedUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);