import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../Contexts/userContext";

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
                <button className="btn btn-primary">Login</button>
              </Link>
            )}
            {location.pathname === "/login" && (
              <Link to="/sign-up">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            )}
          </>
        ) : (
          <button className="btn btn-primary-rounded" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
