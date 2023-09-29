import React, { useEffect } from "react";
import Footer from "../Components/Layout/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/userContext";
import toast from "react-hot-toast";
import { Avatar, Button, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, AvatarIcon, LockClosedIcon } from "@radix-ui/react-icons";

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm<ISignUpForm>();
  const { isLoggedIn, login } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const onSubmit = async (data: ISignUpForm) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/user/register",
        data
      );
      console.log(response);
      login(response.data);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root size="3" radius="full" className="form-group">
              <TextField.Slot>
                <AvatarIcon height={16} width={16} />
              </TextField.Slot>
              <TextField.Input
                placeholder="Name"
                type="text"
                {...register("name", { required: true })}
              />
            </TextField.Root>
            <TextField.Root size="3" radius="full" className="form-group">
              <TextField.Slot>
                <EnvelopeClosedIcon height={16} width={16} />
              </TextField.Slot>
              <TextField.Input
                placeholder="Email"
                type="email"
                {...register("email", { required: true })}
              />
            </TextField.Root>
            <TextField.Root size="3" radius="full" className="form-group">
              <TextField.Slot>
                <LockClosedIcon height={16} width={16} />
              </TextField.Slot>
              <TextField.Input
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
              />
            </TextField.Root>
            <Button
              radius="full"
              size={"3"}
              color="blue"
              variant="solid"
              className="btn"
            >
              Sign Up
            </Button>
            <p>
              If you already have an account, <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
