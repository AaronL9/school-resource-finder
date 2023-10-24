import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// assets
import "../assets/css/home/home.css";
import "../assets/css/home/reviewer_nav.css";

// components
import BigCard from "../components/home/BigCard";
import SearchBar from "../components/SearchBar";
import SuccessMessg from "../components/SuccessMessg";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { authEvent, setAuthEvent } = useAuthContext();
  const [reviewers, setReviewers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuccessVisible, setSuccessVisible] = useState(false);

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
  };

  useEffect(() => {
    if (authEvent === "SIGNED_IN") setSuccessVisible(true);
    supabase.auth.onAuthStateChange((event) => {
      setAuthEvent(event);
    });
    const fetchReviewers = async () => {
      let { data, error } = await supabase
        .from("reviewers")
        .select("*")
        .ilike("title", `%${searchQuery}%`)
        .order("created_at", { ascending: false });
      console.log(searchQuery);
      if (data) setReviewers(data);
      if (error) console.log(error.message);
    };
    fetchReviewers();
  }, [searchQuery]);

  return (
    <>
      {isSuccessVisible && (
        <SuccessMessg
          message={"Login Succesfully"}
          onClose={handleCloseSuccess}
        />
      )}
      <div className="home">
        <h1 className="home__title">Home</h1>
        <section className="reviewers">
          <div className="reviewers__searchbar">
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <div className="reviewers__card-list">
            {reviewers?.map((reviewer, index) => (
              <BigCard
                key={index}
                details={reviewer}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
