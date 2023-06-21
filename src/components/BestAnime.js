import React from "react";
import "../sass/Components-sass/BestAnime.css";

function BestAnime({ Img, AnimeName }) {
  return (
    <div className="bestAnime">
      <img src={Img} alt={AnimeName} />
    </div>
  );
}

export default BestAnime;
