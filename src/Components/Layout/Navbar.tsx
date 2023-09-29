import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../Contexts/userContext";
import { Button } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";


const Navbar = () => {
  const { isLoggedIn, logout } = useUser();
  const location = useLocation();

  return (
    <nav className="navbar bg-primary">
      <Link className="navbar-brand" to={isLoggedIn ? "/" : "/login"}>
        <img src="/logo.png" alt="logo" className="navbar-brand brand-logo" />
        <span>Chat App</span>
      </Link>
      <div className="action">
        {!isLoggedIn ? (
          <>
            {location.pathname === "/sign-up" && (
              <Link to="/login">
                <Button radius="full" size={"3"} color="blue" variant="solid" >
                  Login
                </Button>
              </Link>
            )}
            {location.pathname === "/login" && (
              <Link to="/sign-up">
                <Button radius="full" size={"3"} color="blue" variant="solid" >
                  Sign Up
                </Button>
              </Link>
            )}
          </>
        ) : (
          <Button
            radius="full"
            size={"3"}
            variant="outline"
            className="btn"
            onClick={() => logout()}
          >
            <ExitIcon />
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
