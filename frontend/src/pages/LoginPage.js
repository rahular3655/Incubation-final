import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {  Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  // const [email, setEmail]=useState('');
  //   const [pass,setPass] = useState('');
  //   const handleSubmit =(e)=>{
  //       e.preventDefault();
  //       console.log(email);
  //   }

  const registerOptions = {
    username: { required: "Name is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password will have at least 8 characters",
      },
    },
  };
  return (
    <div className="main-login-container">
    <div className="auth-form-container ">
      <form className="login-form" onSubmit={handleSubmit(loginUser)}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
          {...register("username", registerOptions.username)}
        />
        <small className="text-danger">
          {errors?.username && errors.username.message}
        </small>
        <label htmlFor="password">password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          {...register("password", registerOptions.password)}
        />
        <small className="text-danger">
          {errors?.password && errors.password.message}
        </small>
        <button type="submit">Log in</button>
      </form>
      <div className="lnk-button mt-3">
        <p>
          Don't have an account?{" "}
          <span className="text-primary">
            <Link to="/register" style={{ color: "red " }}>
              {" "}
              Sign up
            </Link>
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
    </div>
    // <div className="container mt-5">
    //   <div>
    //     <h1 className="m-5 ">Login</h1>
    //     <Form>
    //       <Form.Group className="mb-3" controlId="formBasicEmail">
    //         <Form.Label>Email address</Form.Label>
    //         <Form.Control type="email" placeholder="Enter email" />
    //         <Form.Text className="text-muted">
    //           We'll never share your email with anyone else.
    //         </Form.Text>
    //       </Form.Group>

    //       <Form.Group className="mb-3" controlId="formBasicPassword">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control type="password" placeholder="Password" />
    //       </Form.Group>
    //       <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //         <Form.Check type="checkbox" label="Check me out" />
    //       </Form.Group>
    //       <Button variant="primary" type="submit">
    //         Submit
    //       </Button>
    //     </Form>
    //   </div>
    // </div>
  );
}

export default LoginPage;
