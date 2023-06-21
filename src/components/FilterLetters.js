import React from "react";
import "../sass/Components-sass/FilterLetters.css";
import Letters from "./Letters";

function FilterLetters({ setSearchInput }) {
  function onClick(e) {
    setSearchInput(e.target.innerText.toLowerCase());
  }

  return (
    <div className="letras-container">
      <ul className="letras">
        <Letters
          onClick={() => {
            setSearchInput("");
          }}
          letter="ALL"
        />
        <Letters onClick={onClick} letter="A" />
        <Letters onClick={onClick} letter="B" />
        <Letters onClick={onClick} letter="C" />
        <Letters onClick={onClick} letter="D" />
        <Letters onClick={onClick} letter="E" />
        <Letters onClick={onClick} letter="F" />
        <Letters onClick={onClick} letter="G" />
        <Letters onClick={onClick} letter="H" />
        <Letters onClick={onClick} letter="I" />
        <Letters onClick={onClick} letter="J" />
        <Letters onClick={onClick} letter="K" />
        <Letters onClick={onClick} letter="L" />
        <Letters onClick={onClick} letter="M" />
        <Letters onClick={onClick} letter="N" />
        <Letters onClick={onClick} letter="O" />
        <Letters onClick={onClick} letter="P" />
        <Letters onClick={onClick} letter="Q" />
        <Letters onClick={onClick} letter="R" />
        <Letters onClick={onClick} letter="S" />
        <Letters onClick={onClick} letter="T" />
        <Letters onClick={onClick} letter="U" />
        <Letters onClick={onClick} letter="V" />
        <Letters onClick={onClick} letter="W" />
        <Letters onClick={onClick} letter="X" />
        <Letters onClick={onClick} letter="Y" />
        <Letters onClick={onClick} letter="Z" />
        <Letters onClick={onClick} letter="0-9" />
      </ul>
    </div>
  );
}

export default FilterLetters;
