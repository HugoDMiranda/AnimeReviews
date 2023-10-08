import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../sass/NewAnime.css";
import Axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import filters from "../data/filters.json";
import Transition from "../components/Transition";

function NewAnime() {
  const [animeReviewsList, setAnimeReviewsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://server-anime-reviews.vercel.app/api/reviews").then(
      (response) => {
        setAnimeReviewsList(response.data);
      }
    );
  }, [animeReviewsList]);

  const submitReview = (e) => {
    Axios.post("https://server-anime-reviews.vercel.app/api/reviews", {
      animeName: e.animeName,
      animeSynopsis: e.animeSynopsis,
      animeStatus: e.animeStatus,
      animeYear: e.animeYear,
      animeType: e.animeType,
      animeImg: e.animeImg,
      animeCategory: e.animeCategory,
    });
    setAnimeReviewsList([
      ...animeReviewsList,
      {
        animeName: e.animeName,
        animeSynopsis: e.animeSynopsis,
        animeStatus: e.animeStatus,
        animeYear: e.animeYear,
        animeType: e.animeType,
        animeImg: e.animeImg,
        animeCategory: e.animeCategory,
      },
    ]);
    navigate("/");
  };

  const animeSchema = yup.object().shape({
    animeImg: yup.string().url().required(),
    animeName: yup.string().required(),
    animeType: yup.mixed().oneOf(["Anime", "Movie", "OVA"]).required(),
    animeYear: yup.number().max(2024).positive().required(),
    animeStatus: yup.mixed().oneOf(["Air", "Concluded", "Soon"]).required(),
    animeSynopsis: yup.string().required(),
    animeCategory: yup.mixed().oneOf(filters[0]).required(),
  });

  const initialValues = {
    animeImg: "",
    animeName: "",
    animeType: "",
    animeYear: "",
    animeStatus: "",
    animeSynopsis: "",
    animeCategory: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitReview}
      validationSchema={animeSchema}
    >
      <Form className="newAnimePage-container">
        <div className="newAnimePage-container-info">
          <h3>Anime Name:</h3>
          <Field
            placeholder="Anime Name..."
            autoComplete="off"
            name="animeName"
            type="text"
          />
          <h3 className="newAnimeImgText">Anime Img: </h3>
          <Field
            className="newAnimeImg"
            name="animeImg"
            placeholder="Img URL..."
            type="url"
          />

          <h3>Type: </h3>
          <Field placeholder="Type" name="animeType" component="select">
            {filters[1].map((status) => {
              return (
                <option value={status} key={status}>
                  {status}
                </option>
              );
            })}
          </Field>

          <h3>Year: </h3>
          <Field placeholder="Year..." name="animeYear" type="number" />

          <h3>Status: </h3>
          <Field placeholder="Status..." name="animeStatus" component="select">
            {filters[2].map((status) => {
              return (
                <option value={status} key={status}>
                  {status}
                </option>
              );
            })}
          </Field>

          <h3>Category: </h3>
          <Field placeholder="Category" name="animeCategory" component="select">
            {filters[0].map((category) => {
              return (
                <option value={category} key={category}>
                  {category}
                </option>
              );
            })}
          </Field>

          <h3>Synopsis: </h3>
          <Field
            className="newAnimeSynopsis"
            name="animeSynopsis"
            placeholder="Synopsis..."
            as="textarea"
            type="textarea"
          />
          <div className="newAnimePage-container-info-button">
            <button type="submit">Add anime</button>
          </div>
          <div className="newAnimePage-container-info-error">
            <ErrorMessage
              name="animeImg"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="animeName"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="animeType"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="animeYear"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="animeStatus"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="animeSynopsis"
              component="span"
              className="errorMessage"
            />
            <ErrorMessage
              name="animeCategory"
              component="span"
              className="errorMessage"
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
}

const WrapperNewAnime = Transition(NewAnime);

export default WrapperNewAnime;
