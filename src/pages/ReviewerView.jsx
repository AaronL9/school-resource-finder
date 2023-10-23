import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";

// assets
import "../assets/css/reviewer_view.css";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import SubmitLoader from "../components/SubmitLoader";
import DownloadBtn from "../components/DownloadBtn";

export default function ReviewerView() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [reviewer, setReviewer] = useState({});
  const [author, setAuthor] = useState(null);
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hanldeAddFavorites = async () => {
    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .match({ student_id: user.id, reviewer_id: id });
      setIsFavorite(false);
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert([{ student_id: user.id, reviewer_id: id }]);
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const fetchReviewers = async () => {
      setIsLoading(true);
      let { data: favorites, error } = await supabase
        .from("favorites")
        .select("*")
        .match({ student_id: user.id, reviewer_id: id });

      if (favorites.length) setIsFavorite(true);
      const { data: reviewers, error: reviewer_error } = await supabase
        .from("reviewers")
        .select("*")
        .eq("reviewer_id", id);

      const { data: reviewer_image, error: reviewer_image_error } =
        await supabase.storage.from("reviewers").download(`image/${id}`);

      const { data: reviewer_pdf, error: reviewer_pdf_error } =
        await supabase.storage.from("reviewers").download(`pdf/${id}`);

      const { data: student, error: student_error } = await supabase
        .from("student")
        .select("full_name")
        .eq("student_id", reviewers[0].student_id);

      if (reviewer_image_error || reviewer_error || student_error)
        console.log(reviewer_error, reviewer_image_error, student_error);

      if (reviewers) setReviewer(reviewers[0]);
      if (student) setAuthor(student[0].full_name);
      if (reviewer_image) setImage(URL.createObjectURL(reviewer_image));
      if (reviewer_pdf) setPdf(URL.createObjectURL(reviewer_pdf));
      setIsLoading(false);
    };
    fetchReviewers();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="global-loader">
          <SubmitLoader />
        </div>
      ) : (
        <div className="reviewer-view">
          <i
            onClick={hanldeAddFavorites}
            id="heart"
            className={`${
              isFavorite ? "fa-solid" : "fa-regular"
            } fa-heart fa-2x`}
          ></i>
          <h1 className="reviewer-view__title">{reviewer.title}</h1>
          <h2 className="reviewer-view__subject">{reviewer.subject}</h2>
          <figure className="revewer-view__figure">
            <img
              className="reviewer-view__image"
              src={image}
              alt="reviewer image"
            />
            <figcaption className="reviewer-view_author">
              By <span>{author}</span>
            </figcaption>
          </figure>
          <p className="reviewer-view__description">{reviewer.description}</p>
          <object
            data={pdf}
            type="application/pdf"
            width="80%"
            height="800px"
            style={{ borderRadius: "10px" }}
          >
            <div className="reviewer-view__error">
              <DownloadBtn url={pdf} /> 
              <p>Unable to display PDF file. Download instead.</p>
            </div>
          </object>
        </div>
      )}
    </>
  );
}
