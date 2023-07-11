import React from "react";
import "../sass/Components-sass/AnimeList.css";
import { Link } from "react-router-dom";

function AnimeList({ Img, animeName, Ratio, Synopsis, id }) {
  return (
    <Link className="AnimeList" to={`/AnimePage/${id}`} animeName={animeName}>
      <img src={Img} alt={animeName} className="card-img-top img-fluid" />
      <div className="AnimeText">
        <h1 className="animeName">{animeName}</h1>
        <h1 className="animeRatio">{isNaN(Ratio) ? "--" : Ratio}</h1>
        <p className="synopsis">{Synopsis}</p>
      </div>
    </Link>
  );
}

export default AnimeList;
