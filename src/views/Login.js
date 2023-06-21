import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../sass/Login.css";
import Axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";

function Login() {
  // const [passLogin, setPassLogin] = useState("");
  // const [nameLogin, setNameLogin] = useState("");
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      // await Axios.post("http://localhost:3001/api/auth/login", {
      //   username: nameLogin,
      //   userpassword: passLogin,
      // });
      await login(e.name, e.password);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
      console.log(err.response.data);
    }
  };

  // const [nameLogin, setNameLogin] = useState("");
  // const [passLogin, setPassLogin] = useState("");

  // const [loginStatus, setLoginStatus] = useState("");

  // Axios.defaults.withCredentials = true;

  // const handleSubmitLogin = (e) => {
  //   e.preventDefault();

  //   Axios.post("http://localhost:3001/login", {
  //     username: nameLogin,
  //     userpassword: passLogin,
  //   }).then((response) => {
  //     console.log(response);
  //     if (response.data.message) {
  //       setLoginStatus(response.data.message);
  //     } else {
  //       setLoginStatus(response.data[0].name);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     if (response.data.loggedIn === true)
  //       setLoginStatus(response.data.user[0].name);
  //   });
  // }, []);

  const userSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
  });

  const initialValues = {
    name: "",
    password: "",
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form className="login-form">
          <label for="email">name</label>
          <Field
            autoComplete="off"
            type="text"
            placeholder="your name"
            id="name"
            name="name"
          />
          <label for="password">password</label>
          <Field
            autoComplete="off"
            type="password"
            placeholder="*********"
            id="password"
            name="password"
          />
          <button type="submit">Log In</button>
          {err && <span className="errorMessage">{err}</span>}
        </Form>
      </Formik>
      <Link className="login" to="/Register">
        Don`t have an account? Register here.
      </Link>
    </div>
  );
}

export default Login;
