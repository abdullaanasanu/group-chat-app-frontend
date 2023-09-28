import React, { useEffect } from "react";
import Footer from "../Components/Layout/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/userContext";
import toast from "react-hot-toast";

export default function SignUpPage() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { isLoggedIn, login } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(process.env.REACT_APP_API_URL + "/user/register", data)
      .then((response) => {
        console.log(response);
        login(response.data);
        // localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
            <p>
              If you already have an account, <Link to="/login">Login</Link>
            </p>
            {/* <Link to="/login">
              <button className="btn btn-primary-rounded" type="button">
                Login
              </button>
            </Link> */}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
