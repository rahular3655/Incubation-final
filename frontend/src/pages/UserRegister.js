import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  let { userSignup } = useContext(AuthContext);
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const registerOptions = {
    username: { required: "Name is required" },
    first_name: { required: "Name is required" },
    last_name: { required: "Name is required" },
    email: {
      required: "Email is required.",
      pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "Email is not valid.",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
    password2: {
      required: "Re-enter password",
      minLength: {
        message: "Password must be equal",
      },
    },
  };

  return (
    <div className="parent-main-container">
      <div className="register-container">
        <h2 className="text-white SIGNUPAP" >Signup</h2>
        <form className="register-form" onSubmit={handleSubmit(userSignup)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            name="name"
            {...register("username", registerOptions.username)}
          />
          <small className="text-danger">
            {errors?.name && errors.name.message}
          </small>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            placeholder="firstname"
            name="firstname"
            {...register("first_name", registerOptions.first_name)}
          />
          <small className="text-danger">
            {errors?.name && errors.name.message}
          </small>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            placeholder="lastname"
            name="lastname"
            {...register("last_name", registerOptions.last_name)}
          />
          <small className="text-danger">
            {errors?.name && errors.name.message}
          </small>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="hello@example.com"
            name="email"
            {...register("email", registerOptions.email)}
          />
          <small className="text-danger">
            {errors?.email && errors.email.message}
          </small>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", registerOptions.password)}
          />
          <small className="text-danger">
            {errors?.password && errors.password.message}
          </small>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password2"
            {...register("password2", registerOptions.password2)}
          />
          <small className="text-danger">
            {errors?.password && errors.password.message}
          </small>
          <button className="align-content-center" type="submit">Sign Up</button>
        </form>
        <div className="lnk-button mt-3 align-content-center">
          <p>
            Already have an account?{" "}
            <a className="text-primary " onClick={() => Navigate("/login")}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
