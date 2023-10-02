import React from "react";
import BigCard from "../components/home/BigCard";
import '../assets/css/favorites.css'

export default function Favorites() {
  return (
    <div className="favorites">
      <h1 className="favorites__title">Favorites</h1>
      <div className="reviewers__card-list">
        <BigCard />
        <BigCard />
        <BigCard />
        <BigCard />
        <BigCard />
        <BigCard />
      </div>
    </div>
  );
}
