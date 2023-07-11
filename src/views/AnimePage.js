import "../sass/AnimePage.css";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Reviews from "../components/Reviews";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { RxUpdate, RxCross1 } from "react-icons/rx";
import filters from "../data/filters.json";

function AnimePage() {
  let { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [animePage, setAnimePage] = useState([]);
  const [animeComments, setAnimeComments] = useState([]);
  const [animeRatio, setAnimeRatio] = useState();
  const [updateAnime, setUpdateAnime] = useState(false);

  useEffect(() => {
    Axios.get(`https://server-anime-reviews.vercel.app/api/reviews/${id}`).then(
      (response) => {
        setAnimePage(response.data[0]);
      }
    );

    Axios.get(
      `https://server-anime-reviews.vercel.app/api/comments/${id}`
    ).then((response) => {
      setAnimeComments(response.data);
    });

    let ratio = [];

    animeComments.map((comment) => {
      return ratio.push(Number(comment.ratio));
    });

    let suma = (ratio) => {
      let numero = 0;
      ratio.forEach((num) => {
        numero += num;
      });
      return numero;
    };

    let promedio = (suma(ratio) / animeComments.length).toFixed(1);

    setAnimeRatio(promedio);
    console.log(suma(ratio));
  }, [id, animeComments, animeRatio]);

  const deleteReview = (id) => {
    Axios.delete(`https://server-anime-reviews.vercel.app/api/reviews/${id}`);
  };

  const updateReview = (e) => {
    Axios.put(`https://server-anime-reviews.vercel.app/api/reviews/${id}`, {
      id: id,
      newSynopsis: e.newSynopsis,
      newName: e.newName,
      newType: e.newType,
      newYear: e.newYear,
      newStatus: e.newStatus,
      newImg: e.newImg,
    });
    setUpdateAnime(!updateAnime);
  };

  const animeSchema = yup.object().shape({
    newImg: yup.string().url().required(),
    newName: yup.string().required(),
    newType: yup.mixed().oneOf(["Anime", "Movie", "OVA"]).required(),
    newYear: yup.number().max(2024).positive().required(),
    newStatus: yup.mixed().oneOf(["Air", "Concluded", "Soon"]).required(),
    newSynopsis: yup.string().required(),
    // newCategory: yup.mixed().oneOf(filters[0]).required(),
  });

  const initialValues = {
    newImg: "",
    newName: "",
    newType: "",
    newYear: "",
    newStatus: "",
    newSynopsis: "",
    // newCategory: "",
  };

  return (
    <div className="animeReview">
      {updateAnime ? (
        <Formik
          initialValues={initialValues}
          onSubmit={updateReview}
          validationSchema={animeSchema}
        >
          <Form className="animePage-container">
            {currentUser?.admin === 1 ? (
              <div className="button-container">
                <button type="submit">
                  <AiOutlineCheck />
                </button>
                <button onClick={() => setUpdateAnime(!updateAnime)}>
                  <RxCross1 />
                </button>
              </div>
            ) : null}
            <div>
              <h1 className="newAnimeImgText">New Img</h1>
              <Field
                className="newAnimeImg"
                name="newImg"
                placeholder=" New Img URL..."
                type="url"
              />
            </div>

            <div className="newAnimeInf">
              <div className="newAnime-name-ratio">
                <h1>New name:</h1>
                <Field placeholder="New name..." name="newName" type="text" />
              </div>
              <div className="newAnimeData">
                <div>
                  <h4>New type:</h4>
                  <Field
                    placeholder="New type"
                    name="newType"
                    type="text"
                    component="select"
                  >
                    {filters[1].map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </Field>
                </div>
                <div>
                  <h4>New year:</h4>
                  <Field
                    placeholder="New year..."
                    name="newYear"
                    type="number"
                  />
                </div>
                <div>
                  <h4>New status:</h4>
                  <Field
                    placeholder="New status..."
                    name="newStatus"
                    type="text"
                    component="select"
                  >
                    {filters[2].map((status) => {
                      return <option value={status}>{status}</option>;
                    })}
                  </Field>
                </div>
              </div>
              <h2>New Synopsis:</h2>
              <Field
                className="newAnimeSynopsis"
                name="newSynopsis"
                placeholder="New synopsis..."
                type="text"
                as="textarea"
              />
              <div className="update-error">
                <ErrorMessage
                  name="newImg"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newName"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newType"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newYear"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newStatus"
                  component="span"
                  className="errorMessage"
                />
                <ErrorMessage
                  name="newSynopsis"
                  component="span"
                  className="errorMessage"
                />
              </div>
            </div>
          </Form>
        </Formik>
      ) : (
        <div className="animePage-container">
          <img className="animeImg" alt="animeImg" src={animePage?.animeImg} />
          <div className="animeInf">
            {currentUser?.admin === 1 ? (
              <div className="button-container">
                <button onClick={() => setUpdateAnime(!updateAnime)}>
                  <RxUpdate />
                </button>
                <button onClick={deleteReview}>
                  <AiFillDelete />
                </button>
              </div>
            ) : null}
            <div className="anime-name-ratio">
              <h1>{animePage.animeName}</h1>
              <h2>{isNaN(animeRatio) ? "--" : animeRatio}</h2>
            </div>
            <div className="animeData">
              <div>
                <h4>Type</h4>
                <p>{animePage.animeType}</p>
              </div>
              <div>
                <h4>Year</h4>
                <p>{animePage.animeYear}</p>
              </div>
              <div>
                <h4>Status</h4>
                <p>{animePage.animeStatus}</p>
              </div>
            </div>
            <p className="animeSynopsis">{animePage.animeSynopsis}</p>
          </div>
        </div>
      )}

      {/* <p>Posted {moment(id.date).fromNow()}</p> */}

      <Reviews animeComments={animeComments} animePageId={animePage.id} />
    </div>
  );
}

export default AnimePage;
