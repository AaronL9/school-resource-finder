import React, { useEffect, useState } from "react";
import "../assets/css/profile_reviewers.css";
import { useAuthContext } from "../hooks/useAuthContext";
import supabase from "../config/supabaseClient";
import MyReviewerCard from "./MyReviewerCard";

function ProfileReviewers() {
  const { user } = useAuthContext();
  const [userReviewers, setUserReviewers] = useState([]);

  useEffect(() => {
    const fetchMyReviewers = async () => {
      let { data: reviewers, error } = await supabase
        .from("reviewers")
        .select("*")
        .eq("student_id", user.id);

      if (reviewers) setUserReviewers(reviewers);
    };
    fetchMyReviewers();
  }, []);
  return (
    <div className="profile__reviewers">
      {userReviewers.map((reviewer, index) => (
        <MyReviewerCard key={index} details={reviewer} />
      ))}
    </div>
  );
}

export default ProfileReviewers;
