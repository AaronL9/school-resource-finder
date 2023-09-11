import React from "react";
import "../assets/css/home.css";
import ReviewerSlider from "../components/ReviewerSlider";
import HomeLink from "../components/HomeLink";

// svg
import ReaderIcon from "../assets/svg/ReaderIcon";
import NotesIcon from '../assets/svg/NotesIcon';
import RequestIcon from "../assets/svg/RequestIcon";

export default function Home() {
  return (
    <div className="home">
      <section className="reviewer-slider">
        <h2>Latest Uploads</h2>
        <ReviewerSlider />
      </section>
      <div className="separator"></div>
      <section className="major-link">
        <HomeLink title={"Notes & Reviewer"} SvgIcon={(<ReaderIcon />)} variant={'notes_reviewers'} />
        <HomeLink title={"My Reviewer"} SvgIcon={(<NotesIcon />)} variant={'notes'} />
        <HomeLink title={"Request"} SvgIcon={(<RequestIcon />)} variant={'education'} />
      </section>
    </div>
  );
}
