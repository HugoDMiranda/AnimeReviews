import React from "react";
import Filter from "./Filter";
import "../sass/Components-sass/Filters.css";
import filters from "../data/filters.json";

function Filters({ setSearchInput }) {
  return (
    <div className="filters">
      <input
        placeholder="Search..."
        type="text"
        className="search"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Filter filterName="Type" filterTags={filters[1]} />
      <Filter filterName="Category" filterTags={filters[0]} />
      <Filter filterName="Status" filterTags={filters[2]} />
    </div>
  );
}

export default Filters;
