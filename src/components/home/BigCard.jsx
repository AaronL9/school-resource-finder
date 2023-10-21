import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router-dom";

export default function BigCard({ details }) {
  const [image, setImage] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const colors = ["pink", "blue", "green"];
  let color = 0;
  useEffect(() => {
    const fetchImage = async () => {
      const { data: reviewer_image, error: reviewer_error } =
        await supabase.storage
          .from("reviewers")
          .download(`image/${details.reviewer_id}`);

      const { data: tags, error: tags_error } = await supabase
        .from("tags")
        .select("tag")
        .eq("reviewer_id", details.reviewer_id);

      if (reviewer_error || tags_error) {
        console.log(reviewer_error.message);
        console.log(tags_error.message);
      }

      if (tags) {
        setTags(tags);
      }

      if (reviewer_image) {
        setImage(URL.createObjectURL(reviewer_image));
      }
    };
    fetchImage();
  }, []);
  return (
    <>
      <Link to={`/student/reviewers/${details.reviewer_id}`} className="card-item">
        <img src={image} />
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
        <div className="arrow">
          <i className="fas fa-arrow-right card-icon" />
        </div>
      </Link>
    </>
  );
}
