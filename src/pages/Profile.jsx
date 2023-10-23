import React from "react";
import "../assets/css/profile.css";
import "../assets/css/home/reviewer_nav.css";
import BigCard from "../components/home/BigCard";
import "../assets/css/home/big_card.css";
import ProfileReviewers from "../components/ProfileReviewers";

export default function Profile() {
  const details = {
    created_at: "2023-10-22T12:57:07.259932+00:00",
    description:
      "Python is a dynamically-typed, high-level programming language known for its simplicity and versatility. At the core of Python's flexibility are its data types, which define the kinds of values that can be stored and manipulated in the language. Python provides a rich set of built-in data types, and it also supports custom data types through classes and objects. These data types play a crucial role in shaping the structure and behavior of Python programs.",
    reviewer_id: 17,
    student_id: "1fd054e5-b44c-4b7d-bd36-be0710ef2900",
    subject: "Introduction to programming",
    title: "Python Data Types",
  };
  return (
    <div className="profile">
      <h1 className="profile__title">Profile</h1>
      <div className="profile__header">
        <img className="profile__picture" src="/images/profile.jpg" />
        <h2 className="profile__full-name">Aaron Jeffrey B. Lomibao</h2>
        <span className="profile__track">Webdev-5</span>
      </div>
      <div className="profile__post">
        <h2 className="profile__post-title">My Reviewers</h2>
        <ProfileReviewers />
      </div>
    </div>
  );
}
