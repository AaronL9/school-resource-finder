import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// assets
import "../assets/css/home/home.css";
import "../assets/css/home/reviewer_nav.css";

// components
import BigCard from "../components/home/BigCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [reviewers, setReviewers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(8);
  const totalPages = 20;

  useEffect(() => {
    const fetchReviewers = async () => {
      let { data, error } = await supabase
        .from("reviewers")
        .select("*")
        .ilike("title", `%${searchQuery}%`);
      console.log(searchQuery);
      if (data) setReviewers(data);
      if (error) console.log(error.message);
    };
    fetchReviewers();
  }, [searchQuery]);

  return (
    <div className="home">
      <h1 className="home__title">Home</h1>
      <section className="reviewers">
        <div className="reviewers__searchbar">
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>
        <div className="reviewers__card-list">
          {reviewers?.map((reviewer, index) => (
            <BigCard key={index} details={reviewer} searchQuery={searchQuery} />
          ))}
        </div>
      </section>
    </div>
  );
}
