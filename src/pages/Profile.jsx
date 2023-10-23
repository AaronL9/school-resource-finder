import React, { useEffect, useState } from "react";
import "../assets/css/profile.css";
import "../assets/css/home/reviewer_nav.css";
import "../assets/css/home/big_card.css";
import ProfileReviewers from "../components/ProfileReviewers";
import { useAuthContext } from "../hooks/useAuthContext";
import supabase from "../config/supabaseClient";

export default function Profile() {
  const { user } = useAuthContext();
  const [fullName, setFullName] = useState();

  useEffect(() => {
    const fetchStudent = async () => {
      let { data: student, error } = await supabase
        .from("student")
        .select("full_name")
        .eq("student_id", user.id);

      if (student) setFullName(student[0].full_name);
    };
    fetchStudent();
  });
  return (
    <div className="profile">
      <h1 className="profile__title">Profile</h1>
      <div className="profile__header">
        <img className="profile__picture" src="/images/profile.jpg" />
        <h2 className="profile__full-name">{fullName}</h2>
        <span className="profile__track">Webdev-5</span>
      </div>
      <div className="profile__post">
        <h2 className="profile__post-title">My Reviewers</h2>
        <ProfileReviewers />
      </div>
    </div>
  );
}
