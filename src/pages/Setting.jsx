import React, { useState, useEffect } from "react";
import "../assets/css/setting.css";
import { useAuthContext } from "../hooks/useAuthContext";
import supabase from "../config/supabaseClient";
import SubmitLoader from "../components/SubmitLoader";

const Setting = () => {
  const { user } = useAuthContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const { error: student_error } = await supabase
      .from("student")
      .update({ full_name: `${firstName} ${lastName}` })
      .eq("student_id", user.id);
    if (student_error) console.log(student_error);

    const { error: profile_error } = await supabase.storage
      .from("reviewers")
      .upload(`profile_pictures/${user.id}`, image, {
        cacheControl: "no-cache",
        upsert: true,
      });
    if (profile_error) console.log(image, profile_error.message);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      let { data: student, error } = await supabase
        .from("student")
        .select("full_name")
        .eq("student_id", user.id);

      const { data } = supabase.storage
        .from("reviewers")
        .getPublicUrl(`profile_pictures/${user.id}`);

      try {
        const response = await fetch(data.publicUrl);
        if (response.ok)
          setProfilePic(`${data.publicUrl}?${new Date().getTime()}`);
      } catch (error) {
        setProfilePic(null);
      }

      if (student) {
        const fullName = student[0].full_name.split(" ");
        setFirstName(fullName[0]);
        setLastName(fullName[fullName.length - 1]);
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, []);
  return (
    <div className="profile-page">
      {isLoading && (
        <div className="global-loader">
          <SubmitLoader />
        </div>
      )}
      <div className="profile-container">
        <div className="profile-avatar">
          <label htmlFor="avatar-upload" className="avatar-label">
            <img
              src={profilePic ? profilePic : "/images/profile-pic.jpg"}
              className="profile__picture"
            />
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              id="avatar-upload"
            />
          </label>
        </div>
        <h2>Profile</h2>
        <div>
          <label htmlFor="displayName">First Name:</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="displayName"
          />
        </div>
        <div>
          <label htmlFor="studentNumber">Last Name:</label>
          <input
            value={lastName}
            type="text"
            id="studentNumber"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button onClick={handleUpdate}>Update Profile</button>
      </div>
    </div>
  );
};

export default Setting;
