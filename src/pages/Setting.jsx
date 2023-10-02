import React from 'react'
import '../assets/css/setting.css'
export default function Setting() {
  return (
    <div className="settings">
      <div className="settings__wrapper">
        <div className="settings__left">
          <ul className="settings__menu">
            <li className="settings__menu-item">
              <img
                className="settings__icon"
                src="http://res.cloudinary.com/dikpupfzu/image/upload/v1525474712/Profile_2x.png"
                alt=""
              />
              <span className="settings__text">Profile</span>
            </li>
            <li className="settings__menu-item">
              <img
                className="settings__icon"
                src="http://res.cloudinary.com/dikpupfzu/image/upload/v1525474855/Notification_2x.png"
                alt=""
              />
              <span className="settings__text">Notifications</span>
            </li>
            {/* <li className="settings__menu-item">
              <img
                className="settings__icon"
                src="http://res.cloudinary.com/dikpupfzu/image/upload/v1525474865/Description_2x.png"
                alt=""
              />
              <span className="settings__text">Billing Information</span>
            </li> */}
            <li className="settings__menu-item">
              <img
                className="settings__icon"
                src="http://res.cloudinary.com/dikpupfzu/image/upload/v1525474873/Settings_2x.png"
                alt=""
              />
              <span className="settings__text">General</span>
            </li>
          </ul>
        </div>
        <div className="settings__right">
          <h2 className="settings__title">Profile Settings</h2>
          <img
            className="settings__avatar"
            src="http://res.cloudinary.com/dikpupfzu/image/upload/v1525474876/profile_avatar.png"
            alt=""
          />
          <h3 className="settings__subtitle">Edit Picture</h3>
          <div className="settings__form">
            <form action="index.html" method="post">
              <div className="settings__field">
                <label htmlFor="full-name">Full Name</label>
                <input
                  className="settings__input"
                  type="text"
                  id="full-name"
                  name="full-name"
                  defaultValue=""
                />
              </div>
              <div className="settings__field">
                <label htmlFor="email">Email</label>
                <input
                  className="settings__input"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="settings__field">
                <label htmlFor="password">Password</label>
                <input
                  className="settings__input"
                  type="text"
                  id="password"
                  name="password"
                />
              </div>
              <div className="settings__field">
                <label htmlFor="birthday">Birthday</label>
                <input
                  className="settings__input"
                  type="text"
                  id="birthday"
                  name="birthday"
                />
              </div>
            </form>
          </div>
          <div className="settings__bottom">
            <a href="#">
              <button
                className="settings__button settings__button--left"
                type="submit"
                name="button"
              >
                Save Changes
              </button>
            </a>
            <a href="#">
              <button
                className="settings__button settings__button--right"
                type="cancel"
                name="button"
              >
                Cancel
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
