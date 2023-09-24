import React, { useEffect } from "react";
import { useUser } from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function ProctectRoutes({ children }) {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  console.log("isLoggedIn", isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  if (isLoggedIn) {
    return <>{children}</>;  
  }
  
}
