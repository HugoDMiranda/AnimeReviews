import React from "react";
import "../sass/Components-sass/AddAnime.css";
import { Link } from "react-router-dom";

function AddAnime() {
  return (
    <div className="addAnime">
      <Link className="addLink" to="/NewAnime">
        ADD ANIME
      </Link>
    </div>
  );
}

export default AddAnime;
