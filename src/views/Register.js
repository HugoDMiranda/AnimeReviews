import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../sass/Register.css";
import Axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Register() {
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      await Axios.post(
        "https://server-animereviews-production.up.railway.app/api/auth/register",
        {
          username: e.name,
          userpassword: e.password,
          useremail: e.email,
        }
      );
      navigate("/Login");
    } catch (err) {
      setErr(err.response.data);
      console.log(err);
    }
  };

  const userSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().min(4).required(),
    email: yup.string().email().required(),
  });

  const initialValues = {
    name: "",
    password: "",
    email: "",
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form className="register-form">
          <label for="name">name</label>
          <Field
            autoComplete="off"
            type="name"
            placeholder="full Name"
            id="name"
            name="name"
          />
          <ErrorMessage name="name" component="span" className="errorMessage" />
          <label for="password">password</label>
          <Field
            autoComplete="off"
            type="password"
            placeholder="*********"
            id="password"
            name="password"
          />
          <ErrorMessage
            name="password"
            component="span"
            className="errorMessage"
          />
          <label for="email">email</label>
          <Field
            autoComplete="off"
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <ErrorMessage
            name="email"
            component="span"
            className="errorMessage"
          />
          <button type="submit">Register</button>
          {err && <span className="errorMessage">{err}</span>}
        </Form>
      </Formik>

      <Link className="register" to="/Login">
        Already have an account? Login here.
      </Link>
    </div>
  );
}

export default Register;
