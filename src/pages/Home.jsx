import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// assets
import "../assets/css/home/home.css";
import "../assets/css/home/reviewer_nav.css";

// components
import ReviewerSlider from "../components/ReviewerSlider";
import ReviewersItem from "../components/home/ReviewersItem";
import BigCard from "../components/home/BigCard";

export default function Home() {
  const [reviewers, setReviewers] = useState([]);

  useEffect(() => {
    const fetchReviewers = async () => {
      let { data, error } = await supabase
        .from("reviewers")
        .select("reviewer_id, title, subject, description");
      if (data) setReviewers(data);
      if (error) console.log(error.message);
    };
    fetchReviewers();
  }, []);

  return (
    <div className="home">
      <section className="reviewer-slider">
        <h2>Latest Uploads</h2>
        <ReviewerSlider />
      </section>
      <div className="separator"></div>
      <section className="reviewers">
        <div className="reviewers__nav">
          <ul className="reviewers__links">
            <ReviewersItem label={"All"} />
            <ReviewersItem label={"Popular"} />
            <ReviewersItem label={"Recommended"} />
            <ReviewersItem label={"Programming"} />
            <ReviewersItem label={"Web Development"} />
            <ReviewersItem label={"Databases"} />
            <ReviewersItem label={"Animation"} />
            <ReviewersItem label={"System Development"} />
          </ul>
        </div>
        <div className="reviewers__card-list">
          {reviewers?.map((reviewer, index) => (
            <BigCard key={index} details={reviewer} />
          ))}
        </div>
      </section>
    </div>
  );
}
