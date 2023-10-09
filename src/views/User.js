import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../sass/User.css";
import Axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";

function User() {
  const [res, setRes] = useState(null);
  const [password, setPassword] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const changePassword = async (e) => {
    try {
      await Axios.put(
        "https://backend-controlbox.vercel.app/api/auth/password",
        {
          oldPassword: e.oldPassword,
          newPassword: e.newPassword,
          repPassword: e.repPassword,
          username: currentUser.name,
        }
      );
      setRes("Your password was successfully changed");
      setPassword(false);
    } catch (err) {
      setRes(err.response.data);
      console.log(err);
    }
  };

  const userSchema = yup.object().shape({
    oldPassword: yup.string().min(4).required(),
    newPassword: yup.string().min(4).required(),
    repPassword: yup.string().min(4).required(),
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    repPassword: "",
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, x: -300, transition: { duration: 0.1 } }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300, transition: { duration: 0.1 } }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <h2>Your account</h2>
      <div className="register-form">
        <label for="name">Your name:</label>
        <h2 className="user-name">{currentUser.name}</h2>
      </div>
      {!password ? (
        <>
          <button onClick={() => setPassword(true)}>
            Do you want to change your password?
          </button>
          {res === "Your password was successfully changed" && (
            <span className="successMessage ">{res}</span>
          )}
        </>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={changePassword}
          validationSchema={userSchema}
        >
          <Form className="register-form">
            <button onClick={() => setPassword(false)}>
              Don't want to change your password?
            </button>
            <h4>Change your password</h4>
            <label for="name">Your password</label>
            <Field
              autoComplete="off"
              type="password"
              placeholder="*********"
              id="oldPassword"
              name="oldPassword"
            />
            <ErrorMessage
              name="oldPassword"
              component="span"
              className="errorMessage"
            />
            <label for="password">New password</label>
            <Field
              autoComplete="off"
              type="password"
              placeholder="*********"
              id="newPassword"
              name="newPassword"
            />
            <ErrorMessage
              name="newPassword"
              component="span"
              className="errorMessage"
            />
            <label for="email">Confirm new password</label>
            <Field
              autoComplete="off"
              type="password"
              placeholder="*********"
              id="repPassword"
              name="repPassword"
            />
            <ErrorMessage
              name="repPassword"
              component="span"
              className="errorMessage"
            />
            <button type="submit" className="button-submit">
              Change password
            </button>
            {res !== "Your password was successfully changed" && (
              <span className="errorMessage">{res}</span>
            )}
          </Form>
        </Formik>
      )}
      <Link className="register" to="/">
        Get back to home page.
      </Link>
    </motion.div>
  );
}

export default User;
