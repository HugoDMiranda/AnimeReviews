import React, { useContext } from "react";
import FilterLetters from "../components/FilterLetters";
import Filters from "../components/Filters";
import "../sass/Home.css";
import AnimeList from "../components/AnimeList";
import LastAnime from "../components/LastAnime";
import BestAnime from "../components/BestAnime";
import AddAnime from "../components/AddAnime";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
import { motion } from "framer-motion";

function Home() {
  const { currentUser } = useContext(AuthContext);

  const [animeReviewsList, setAnimeReviewsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [comentarios, setComentarios] = useState([]);

  const category = useLocation().search;

  const filterSearch = animeReviewsList.filter((Anime) => {
    return searchInput.toLowerCase() === ""
      ? Anime
      : searchInput === "0-9"
      ? Anime.animeName.includes(0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9)
      : Anime.animeName.toLowerCase().startsWith(searchInput);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rescom = await Axios.get(
          `https://server-anime-reviews.vercel.app/api/comments`
        );
        setComentarios(rescom.data);

        const res = await Axios.get(
          `https://server-anime-reviews.vercel.app/api/reviews${category}`
        );
        setAnimeReviewsList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category, currentUser, comentarios]);

  const animeRatio = (id) => {
    let ratio = [];

    comentarios.map((comment) => {
      if (id === comment.animeId) {
        return ratio.push(Number(comment.ratio));
      } else {
        return null;
      }
    });

    let suma = (ratio) => {
      let numero = 0;
      ratio.forEach((num) => {
        numero += num;
      });
      return numero;
    };

    let promedio = (suma(ratio) / ratio.length).toFixed(1);

    return promedio;
  };

  return (
    <motion.main
      className="home-container"
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <FilterLetters setSearchInput={setSearchInput} />
      <Filters setSearchInput={setSearchInput} />
      <div className="info-container">
        <div className="last-container">
          <h3 className="last-text">Last Anime</h3>
          <ul className="last-animes">
            {animeReviewsList &&
              animeReviewsList.map((Anime) => {
                return (
                  <LastAnime
                    AnimeName={Anime.animeName}
                    AnimeType={Anime.animeType}
                    key={Anime.id}
                  />
                );
              })}
          </ul>
        </div>
        <div className="animes-container">
          <h1 className="animes-text">Anime List</h1>
          <div className="animes-list-container">
            {currentUser?.admin === 1 ? <AddAnime /> : null}
            {filterSearch.map((Anime) => {
              return (
                <AnimeList
                  Img={Anime.animeImg}
                  animeName={Anime.animeName}
                  Synopsis={Anime.animeSynopsis}
                  Ratio={animeRatio(Anime.id)}
                  Type={Anime.animeType}
                  key={Anime.id}
                  id={Anime.id}
                />
              );
            })}
          </div>
        </div>
        <div className="best-container">
          <h3 className="best-text">Best Anime</h3>
          {animeReviewsList &&
            animeReviewsList.map((Anime) => {
              if (animeRatio(Anime.id) >= 4.8) {
                return (
                  <BestAnime
                    Img={Anime.animeImg}
                    AnimeName={Anime.animeName}
                    key={Anime.id}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    </motion.main>
  );
}

export default Home;
