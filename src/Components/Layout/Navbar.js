import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Contexts/userContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useUser();
  return (
    <nav className="navbar bg-primary">
      <Link className="navbar-brand" to={isLoggedIn ? "/" : "/login"}>
        <img src="/logo.png" alt="logo" className="navbar-brand brand-logo" />
        <span>Chat App</span>
      </Link>
      <div className="action">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/sign-up">
              <button className="btn btn-primary">Sign Up</button>
            </Link>
          </>
        ) : (
          <>
            <button className="btn btn-primary-rounded" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
