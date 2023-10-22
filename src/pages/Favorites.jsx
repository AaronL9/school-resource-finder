import React, { useEffect, useState } from "react";
import BigCard from "../components/home/BigCard";
import "../assets/css/favorites.css";
import supabase from "../config/supabaseClient";
import { useAuthContext } from "../hooks/useAuthContext";
import SubmitLoader from "../components/SubmitLoader";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      let { data: favorites, error } = await supabase
        .from("favorites")
        .select("reviewer_id")
        .eq("student_id", user.id);

      if (favorites) {
        console.log(favorites);
        const reviewers_id = favorites.map((fav) => fav.reviewer_id);
        let { data: reviewers, error } = await supabase
          .from("reviewers")
          .select("*")
          .in("reviewer_id", reviewers_id);
        if (reviewers) setFavorites(reviewers);
      }

      if (error) console.error(error.message);
      setIsLoading(false);
    };
    fetchFavorites();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="global-loader">
          <SubmitLoader />
        </div>
      ) : (
        <div className="favorites">
          <h1 className="favorites__title">Favorites</h1>
          <div className="reviewers__card-list">
            {favorites.map((favorite, index) => (
              <BigCard key={index} details={favorite} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
