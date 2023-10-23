import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import ImageLoader from "../components/ImageLoader";
import { limitString } from "../assets/js/StringFormatter";

export default function ProfileCard({ details }) {
  const [isLoading, setIsloading] = useState(true);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      const { data: reviewer_image, error: reviewer_error } =
        await supabase.storage
          .from("reviewers")
          .download(`image/${details.reviewer_id}`);

      if (reviewer_image) setImage(URL.createObjectURL(reviewer_image));
    };
    fetchImage();
  }, []);
  return (
    <div className="profile__card">
      <div className="profile__img">
        <img
          className={isLoading ? "loading" : "loaded"}
          src={image}
          onLoad={() => setIsloading(false)}
        />
        {isLoading && <ImageLoader />}
      </div>
      <div className="profile__top-text">
        <div className="profile__reviewer-title">{details.title}</div>
        <p className="profile__subject">{details.subject}</p>
      </div>
      <div className="profile__bottom-text">
        <div className="profile__text">{limitString(details.description, 100)}</div>
        <div className="profile__btn">
          <Link to={`reviewer/${details.reviewer_id}`}>Edit</Link>
        </div>
      </div>
    </div>
  );
}
