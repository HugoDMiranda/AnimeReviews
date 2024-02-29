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
import { motion } from "framer-motion";
// import transition from "../components/transition";

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
    <motion.div
      className="animeReview"
      initial={{ opacity: 0, x: -300, transition: { duration: 0.1 } }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      transition={{ type: "tween", duration: 1 }}
    >
      {updateAnime ? (
        <Formik
          initialValues={initialValues}
          onSubmit={updateReview}
          validationSchema={animeSchema}
        >
          <Form className="animePage-container">
            <div className="newAnimeInf AnimeInf">
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

              <h3>New Img:</h3>
              <Field name="newImg" placeholder=" New Img URL..." type="url" />

              <h3>New name:</h3>
              <Field placeholder="New name..." name="newName" type="text" />

              <h3>New type:</h3>
              <Field
                placeholder="New type"
                name="newType"
                type="text"
                component="select"
              >
                {filters[1]?.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </Field>

              <h3>New year:</h3>
              <Field placeholder="New year..." name="newYear" type="number" />

              <h3>New status:</h3>
              <Field
                placeholder="New status..."
                name="newStatus"
                type="text"
                component="select"
              >
                {filters[2]?.map((status) => {
                  return <option value={status}>{status}</option>;
                })}
              </Field>

              <h3>New Synopsis:</h3>
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
                <button onClick={() => deleteReview()}>
                  <AiFillDelete />
                </button>
              </div>
            ) : null}
            <div className="anime-name-ratio">
              <h1>{animePage?.animeName}</h1>
              <h2>{isNaN(animeRatio) ? "--" : animeRatio}</h2>
            </div>
            <div className="animeData">
              <div>
                <h4>Type</h4>
                <p>{animePage?.animeType}</p>
              </div>
              <div>
                <h4>Year</h4>
                <p>{animePage?.animeYear}</p>
              </div>
              <div>
                <h4>Status</h4>
                <p>{animePage?.animeStatus}</p>
              </div>
            </div>
            <p className="animeSynopsis">{animePage?.animeSynopsis}</p>
          </div>
        </div>
      )}

      {/* <p>Posted {moment(id.date).fromNow()}</p> */}

      <Reviews animeComments={animeComments} animePageId={animePage.id} />
    </motion.div>
  );
}

export default AnimePage;
