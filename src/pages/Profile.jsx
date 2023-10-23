import React, { useEffect, useState } from "react";
import "../assets/css/profile.css";
import "../assets/css/home/reviewer_nav.css";
import "../assets/css/home/big_card.css";
import ProfileReviewers from "../components/ProfileReviewers";
import { useAuthContext } from "../hooks/useAuthContext";
import supabase from "../config/supabaseClient";
import SubmitLoader from "../components/SubmitLoader";

export default function Profile() {
  const { user } = useAuthContext();
  const [fullName, setFullName] = useState();
  const [URL, setURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchStudent = async () => {
      let { data: student, error } = await supabase
        .from("student")
        .select("full_name")
        .eq("student_id", user.id);

      if (student) setFullName(student[0].full_name);

      const { data } = supabase.storage
        .from("reviewers")
        .getPublicUrl(`profile_pictures/${user.id}`);

      try {
        const response = await fetch(data.publicUrl);
        if (response.ok) setURL(`${data.publicUrl}?${new Date().getTime()}`);
      } catch (error) {
        setProfilePic(null);
      }
      setIsLoading(false);
    };
    fetchStudent();
  }, []);
  return (
    <div className="profile">
      {isLoading && (
        <div className="global-loader">
          <SubmitLoader />
        </div>
      )}
      <h1 className="profile__title">Profile</h1>
      <div className="profile__header">
        <img
          className="profile__picture"
          src={URL ? URL : "/images/profile.jpg"}
        />
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
