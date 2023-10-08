import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../sass/Login.css";
import Axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";

function Login() {
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    try {
      await login(e.name, e.password);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
      console.log(err.response.data);
    }
  };

  const userSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required(),
  });

  const initialValues = {
    name: "",
    password: "",
  };

  return (
    <motion.div
      className="form-container"
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
          <button type="submit" className="button-submit">
            Log In
          </button>
          {err && <span className="errorMessage">{err}</span>}
        </Form>
      </Formik>
      <Link className="login" to="/Register">
        Don`t have an account? Register here.
      </Link>
    </motion.div>
  );
}

export default Login;
