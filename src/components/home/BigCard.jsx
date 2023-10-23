import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router-dom";
import ImageLoader from "../../components/ImageLoader";
import "../../assets/css/home/big_card.css";

export default function BigCard({ details, searchQuery }) {
  const [image, setImage] = useState([]);
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState(null);

  const [isLoading, setIsloading] = useState(true);
  const colors = ["pink", "blue", "green"];
  let color = 0;

  useEffect(() => {
    const fetchImage = async () => {
      const { data: URL, error: image_error } = supabase.storage
        .from("reviewers")
        .getPublicUrl(`image/${details.reviewer_id}`);

      const { data: tags, error: tags_error } = await supabase
        .from("tags")
        .select("tag")
        .eq("reviewer_id", details.reviewer_id);

      const { data: student, error: student_error } = await supabase
        .from("student")
        .select("full_name")
        .eq("student_id", details.student_id);

      if (image_error || tags_error || student_error)
        console.log(
          reviewer_error?.message,
          tags_error?.message,
          student_error?.message
        );

      if (tags) setTags(tags);
      if (URL) setImage(URL.publicUrl);
      if (student) setAuthor(student[0].full_name);
    };
    fetchImage();
  }, [searchQuery]);
  return (
    <>
      <Link
        to={`/student/reviewers/${details.reviewer_id}`}
        className="card-item"
      >
        <div className="image-loader-container">
          <img
            className={isLoading ? "loading" : "loaded"}
            src={image}
            onLoad={() => setIsloading(false)}
          />
          {isLoading && <ImageLoader />}
        </div>
        <div className="tags">
          {tags.map(({ tag }, index) => {
            if (color == 3) color = 0;
            color++;
            return (
              <span key={index} className={colors[index]}>
                {tag}
              </span>
            );
          })}
        </div>
        <h3>{details.title}</h3>
        <span className="card-details__author">
          by <strong>{author}</strong>
        </span>
        <div className="card-details">
          <div className="arrow">
            <i className="fas fa-arrow-right card-icon" />
          </div>
        </div>
      </Link>
    </>
  );
}
