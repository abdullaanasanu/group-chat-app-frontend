import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IUser {
  token: string | null;
  user: any;
  isLoggedIn: boolean;
  login: (data: { token: string, user: any }) => void;
  logout: () => void;
}

interface IUserProviderProps  {
  children: ReactNode;
}

interface ILoginData {
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
  }
}

const UserContext = createContext<IUser>({
  token: null,
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function useUser() {
  return useContext(UserContext);
  
}

export function UserProvider({ children }: IUserProviderProps) : JSX.Element {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<{
    email: string;
    id: string;
    name: string;
  }| null>(JSON.parse(localStorage.getItem("user") as string ));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);

  const login = (data: ILoginData) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
