import React from "react";
import "../sass/Components-sass/LastAnime.css";

function LastAnime({ AnimeName, AnimeType }) {
  return (
    <li className="last">
      <p className="last-name">{AnimeName}</p>
      <p className="last-type">{AnimeType}</p>
    </li>
  );
}

export default LastAnime;
