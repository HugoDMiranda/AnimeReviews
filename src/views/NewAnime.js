import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../sass/NewAnime.css";
import Axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import filters from "../data/filters.json";

function NewAnime() {
  const [animeReviewsList, setAnimeReviewsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(
      "https://server-animereviews-production.up.railway.app/api/reviews"
    ).then((response) => {
      setAnimeReviewsList(response.data);
    });
  }, [animeReviewsList]);

  const submitReview = (e) => {
    Axios.post(
      "https://server-animereviews-production.up.railway.app/api/reviews",
      {
        animeName: e.animeName,
        animeSynopsis: e.animeSynopsis,
        animeStatus: e.animeStatus,
        animeYear: e.animeYear,
        animeType: e.animeType,
        animeImg: e.animeImg,
        animeCategory: e.animeCategory,
      }
    );
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
        <div className="newAnimeImg-container">
          <h1 className="newAnimeImgText">Anime Img</h1>
          <Field
            className="newAnimeImg"
            name="animeImg"
            placeholder="Img URL..."
            type="url"
          />
        </div>

        <div className="newAnimeInf">
          <div className="newAnime-name-ratio">
            <h1>Anime Name:</h1>
            <Field
              placeholder="Anime Name..."
              autoComplete="off"
              name="animeName"
              type="text"
            />
          </div>
          <div className="newAnimeData">
            <div>
              <h4>Type</h4>
              <Field placeholder="Type" name="animeType" component="select">
                {filters[1].map((status) => {
                  return (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  );
                })}
              </Field>
            </div>
            <div>
              <h4>Year</h4>
              <Field placeholder="Year..." name="animeYear" type="number" />
            </div>
            <div>
              <h4>Status</h4>
              <Field
                placeholder="Status..."
                name="animeStatus"
                component="select"
              >
                {filters[2].map((status) => {
                  return (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  );
                })}
              </Field>
            </div>
            <div>
              <h4>Category</h4>
              <Field
                placeholder="Category"
                name="animeCategory"
                component="select"
              >
                {filters[0].map((category) => {
                  return (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  );
                })}
              </Field>
            </div>
          </div>
          <h4>Synopsis</h4>
          <Field
            className="newAnimeSynopsis"
            name="animeSynopsis"
            placeholder="Synopsis..."
            as="textarea"
            type="textarea"
          />
          <button type="submit">Add anime</button>
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
      </Form>
    </Formik>
  );
}

export default NewAnime;
