import React, { useEffect, useState } from "react";
import "../assets/css/home/home.css";
import "../assets/css/home/reviewer_nav.css";
import ReviewerSlider from "../components/ReviewerSlider";
import ReviewersItem from "../components/home/ReviewersItem";
import BigCard from "../components/home/BigCard";
// import HomeLink from "../components/HomeLink";

// svg
// import ReaderIcon from "../assets/svg/ReaderIcon";
// import NotesIcon from '../assets/svg/NotesIcon';
// import RequestIcon from "../assets/svg/RequestIcon";

export default function Home() {
  const [reviewers, setReviewers] = useState([]);

  useEffect(() => {
    const fetchReviewers = async () => {
      const response = await fetch("http://localhost:5000/api/reviewers/");

      const json = await response.json();

      if (response.ok) {
        setReviewers(json);
      }
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
          {reviewers?.map((reviewer) => (
            <BigCard description={reviewer.description} />
          ))}
        </div>
      </section>
    </div>
  );
}
