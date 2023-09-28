import React, { useEffect, ReactNode } from "react";
import { useUser } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";

interface IProctectRoutesProps {
  children: ReactNode;
}

const ProctectRoutes = ({ children }: IProctectRoutesProps) => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <></>;
};

export default ProctectRoutes;
