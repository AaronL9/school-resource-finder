import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../config/firebase"; // Import 'storage' from Firebase config
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import 'doc' and 'setDoc' from Firebase Firestore
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"; // Import 'getStorage', 'ref', 'uploadBytes', and 'getDownloadURL' for Firebase Storage
import "../assets/css/setting.css";

const Setting = () => {
  const [displayName, setDisplayName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Function to save profile data to local storage
  const saveProfileToLocalStorage = (profileData) => {
    localStorage.setItem("userProfile", JSON.stringify(profileData));
  };

  useEffect(() => {
    // Check local storage for profile data
    const storedProfileData = localStorage.getItem("userProfile");
    if (storedProfileData) {
      const parsedProfileData = JSON.parse(storedProfileData);
      setDisplayName(parsedProfileData.displayName || "");
      setStudentNumber(parsedProfileData.studentNumber || "");
      setProfilePhoto(parsedProfileData.photoURL || "");
    } else {
      const fetchUser = async () => {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const profileData = userDocSnap.data();
            setDisplayName(profileData.displayName || "");
            setStudentNumber(profileData.studentNumber || "");
            setProfilePhoto(profileData.photoURL || "");

            // Save the profile to local storage
            saveProfileToLocalStorage(profileData);
          } else {
            console.log("No such document!");
          }
        }
      };
      fetchUser();
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const updatedProfileInfo = {
          displayName: displayName || null,
          studentNumber: studentNumber || null,
          photoURL: profilePhoto || null,
        };
        await setDoc(userDocRef, updatedProfileInfo, { merge: true });
        console.log("Profile updated successfully!");
        setIsEditing(false);

        // Save the updated profile to local storage
        saveProfileToLocalStorage(updatedProfileInfo);
      } else {
        console.log("User not logged in.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      console.error(
        "File size exceeds the limit (5MB). Please upload a smaller image."
      );
      return;
    }

    try {
      const storageRef = getStorage();
      const fileRef = ref(storageRef, `${auth.currentUser.uid}/profilePhoto`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      setProfilePhoto(downloadURL);
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-avatar">
          <label htmlFor="avatar-upload" className="avatar-label">
            <img
              src={profilePhoto || "https://via.placeholder.com/150"}
              alt="Profile Avatar"
              className="avatar-image"
            />
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              onChange={handleProfilePhotoChange}
              disabled={!isEditing}
            />
          </label>
        </div>
        <h2>Profile</h2>
        <div>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label htmlFor="studentNumber">Student Number:</label>
          <input
            type="text"
            id="studentNumber"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        {isEditing ? (
          <button onClick={handleUpdateProfile}>Update Profile</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default Setting;
