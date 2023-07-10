import "../sass/Components-sass/Reviews.css";
import Comments from "./Comments";
import { AuthContext } from "../context/authContext.js";
import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

function Reviews({ animeComments, animePageId }) {
  const { currentUser } = useContext(AuthContext);

  const [animeCommentsList, setAnimeCommentsList] = useState([]);

  useEffect(() => {
    Axios.get("https://server-anime-reviews.vercel.app/api/comments").then(
      (response) => {
        setAnimeCommentsList(response.data);
      }
    );
  }, [animeCommentsList]);

  const submitComment = async (e) => {
    try {
      await Axios.post("https://server-anime-reviews.vercel.app/api/comments", {
        commentText: e.commentText,
        ratio: e.ratio,
        userId: currentUser.id,
        animeId: animePageId,
      });
      setAnimeCommentsList([
        ...animeCommentsList,
        {
          commentText: e.commentText,
          ratio: e.ratio,
          userId: currentUser.id,
          animeId: animePageId,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const userSchema = yup.object().shape({
    commentText: yup.string().required(),
    ratio: yup.number().max(5).positive().required(),
  });

  const initialValues = {
    commentText: "",
    ratio: "",
  };

  const userComment = animeCommentsList.filter((comment) => {
    return (
      comment.userId === currentUser?.id && comment.animeId === animePageId
    );
  });

  return (
    <div className="reviews-container">
      {currentUser && userComment[0] === undefined ? (
        <Formik
          initialValues={initialValues}
          onSubmit={submitComment}
          validationSchema={userSchema}
        >
          <Form className="form-reviews">
            <div>
              <h2>Add review</h2>
              <Field
                name="commentText"
                placeholder="Your comment"
                type="text"
                className="commentText"
                as="textarea"
              />
            </div>
            <div className="ratio-container">
              <h4>Your Ratio</h4>
              <Field type="number" placeholder="Ratio..." name="ratio" />
              <button type="submit">SUBMIT</button>
            </div>
            <ErrorMessage
              name="commentText"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="ratio"
              component="span"
              className="errorMessage"
            />
          </Form>
        </Formik>
      ) : currentUser && userComment[0] ? (
        <h2 className="already">You already have a review</h2>
      ) : !currentUser ? (
        <Link className="commentLink" to="/Login">
          Log in to make a review
        </Link>
      ) : null}
      <hr />
      <h1>Reviews</h1>
      <div>
        <Comments animeComments={animeComments} />
      </div>
    </div>
  );
}

export default Reviews;
