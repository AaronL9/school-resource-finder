import React, { useState, useEffect } from 'react';
import { auth, firestore, storage } from '../config/firebase'; 
import '../assets/css/setting.css';

const Setting = () => {
  const [displayName, setDisplayName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = firestore.collection('users').doc(user.uid);
      userDocRef.get().then((doc) => {
        if (doc.exists) {
          const profileData = doc.data();
          setDisplayName(profileData.displayName || '');
          setStudentNumber(profileData.studentNumber || '');
          setProfilePhoto(profileData.photoURL || '');
        }
      });
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = firestore.collection('users').doc(user.uid);
        const updatedProfileInfo = {
          displayName: displayName || null,
          studentNumber: studentNumber || null,
          photoURL: profilePhoto || null,
        };
        await userDocRef.set(updatedProfileInfo, { merge: true });
        console.log('Profile updated successfully!');
        setIsEditing(false);
      } else {
        console.log('User not logged in.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024; 
    if (file.size > maxSizeInBytes) {
      console.error('File size exceeds the limit (5MB). Please upload a smaller image.');
      return;
    }

    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`${auth.currentUser.uid}/profilePhoto`);
      await fileRef.put(file);
      const downloadURL = await fileRef.getDownloadURL();
      setProfilePhoto(downloadURL);
    } catch (error) {
      console.error('Error uploading profile photo:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-avatar">
          <label htmlFor="avatar-upload" className="avatar-label">
            <img
              src={profilePhoto || 'https://via.placeholder.com/150'}
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