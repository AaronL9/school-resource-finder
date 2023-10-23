import React, { useEffect, useState } from "react";
import "../assets/css/my_reviewer_card.css";
import { limitString } from "../assets/js/StringFormatter";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";

export default function MyReviewerCard({ details }) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const { data } = supabase.storage
      .from("reviewers")
      .getPublicUrl(`image/${details.reviewer_id}`);

    if (data) setImageUrl(data.publicUrl);
  }, []);
  return (
    <>
      <div
        className="my-2 mx-auto p-relative bg-white shadow-1 blue-hover text-left"
        style={{ width: 360, overflow: "hidden", borderRadius: 1 }}
      >
        <img
          src={imageUrl}
          alt="Man with backpack"
          className="d-block w-full"
        />
        <div className="px-2 py-2">
          <p className="mb-0 small font-weight-medium text-uppercase mb-1 text-muted lts-2px">
            {details.subject}
          </p>
          <h1
            className="ff-serif font-weight-normal text-black card-heading mt-0 mb-1"
            style={{ lineHeight: "1.25" }}
          >
            {details.title}
          </h1>
          <p className="mb-1">{limitString(details.description, 100)}</p>
        </div>
        <Link
          to={`reviewer/${details.reviewer_id}`}
          href="#0"
          className="text-uppercase d-inline-block font-weight-medium lts-2px ml-2 mb-2 text-center styled-link"
        >
          Edit Reviewer
        </Link>
      </div>
    </>
  );
}
